import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ChatBot from "react-chatbotify";
import { Button } from "react-chatbotify";
import robotIcon from "../../assets/img/icon-robot.png";
import { ServiceHttp } from "../../utils/services/serviceHttp.js";

const ChatBotLayout = () => {
  const [dataQuestions, setDataQuestions] = useState([]);
  const [currentSubQuestions, setCurrentSubQuestions] = useState([]);
  const [error, setError] = useState(null);

  const questionService = new ServiceHttp("/questions/all");
  const subQuestionService = new ServiceHttp("/questions/getQuestions");

  const getInitialQuestions = async () => {
    try {
      const data = await questionService.get();
      if (!Array.isArray(data)) {
        throw new Error("Unexpected data format");
      }
      const initial = data.filter((da) => !da.parentQuestionId);
      setDataQuestions(initial);
      if (data.error) throw data.error;
      return data;
    } catch (error) {
      console.error(error);
      setDataQuestions([]);
      setError("Error al cargar las preguntas. Por favor, intenta de nuevo más tarde.");
    }
  };

  const getSubQuestion = async (id) => {
    try {
      const data = await subQuestionService.getById(id);
      if (typeof data !== "object" || Array.isArray(data)) {
        throw new Error("Unexpected data format");
      }
      if (data.error) throw data.error;
      return data.subQuestions; 
    } catch (error) {
      console.error(error);
      setError("Error al cargar las subpreguntas. Por favor, intenta de nuevo más tarde.");
      return [];
    }
  };
  

  useEffect(() => {
    getInitialQuestions();
  }, []);

  const generateResponses = (questions) => {
    if (!Array.isArray(questions)) {
      console.error("Expected an array but got:", questions);
      return {};
    }
  
    const responses = {};
    questions.forEach((question) => {
      const answer = question.answers?.[0];  
      if (answer) {
        responses[question.questionText] = {
          answerText: answer.answerText,
          subQuestions: question.subQuestions,
        };
      } else {
        console.warn(`No answer found for question: ${question.questionText}`);
      }
    });
    return responses;
  };
  

  const responses = generateResponses(dataQuestions);

  const flow = {
    start: {
      message: "¡Hola! Soy UbuntuBOT 👋. Estoy emocionado de que estés usando nuestro chatbot 😊!",
      transition: { duration: 2500 },
      path: "show_options",
    },
    show_options: {
      message: error || (currentSubQuestions.length === 0 ? "Selecciona una opción de la lista" : ""),
      options:
        currentSubQuestions.length > 0
          ? currentSubQuestions.map((subQuestion) => subQuestion.questionText)
          : dataQuestions.map((question) => question.questionText),
      path: "handle_selection",
    },
    handle_selection: {
      transition: { duration: 500 },
      path: async (params) => {
        if (error) {
          await params.injectMessage(error);
          setError(null);
          return "repeat";
        }

        const selectedQuestion = responses[params.userInput];
        const idToFind = dataQuestions.find(
          (question) => question.questionText === params.userInput
        );

        let responseMessage =
          selectedQuestion?.answerText || "No entiendo esa opción. Por favor elige una opción de la lista.";

        await params.injectMessage(responseMessage);

        if (selectedQuestion?.subQuestions?.length > 0) {
          const subQuestionData = await getSubQuestion(idToFind.id);
          if (subQuestionData && subQuestionData.length > 0) {
            setCurrentSubQuestions(subQuestionData);
            await new Promise(resolve => setTimeout(resolve, 100));
            return "show_options_with_subquestions";
          }
        }

        setCurrentSubQuestions([]);
        return "repeat";
      },
    },
    show_options_with_subquestions: {
      options: currentSubQuestions.map((subQuestion) => subQuestion.questionText),
      path: "handle_subquestion_selection",
    },
    handle_subquestion_selection: {
      transition: { duration: 500 },
      path: async (params) => {
        if (error) {
          await params.injectMessage(error);
          setError(null);
          return "repeat";
        }

        const selectedSubQuestion = currentSubQuestions.find(
          (subQuestion) => subQuestion.questionText === params.userInput
        );
        let responseMessage =
          selectedSubQuestion?.answers[0]?.answerText || "Aún no tengo respuesta para esa pregunta 🤬😭 Lo siento";

        await params.injectMessage(responseMessage);

        setCurrentSubQuestions([]);
        return "repeat";
      },
    },
    repeat: {
      transition: { duration: 3000 },
      path: "show_options",
    },
  };

  const settings = {
    general: {
      primaryColor: "#2E8B57",
      secondaryColor: "#4682B4",
      fontFamily: "Lato",
      showFooter: false,
      showInputRow: false,
    },
    audio: {
      disabled: false,
    },
    chatHistory: {
      disabled: true,
      storageKey: "conversations_summary",
    },
    tooltip: {
      mode: "NEVER",
    },
    header: {
      title: "UbuntuBOT",
      buttons: [Button.CLOSE_CHAT_BUTTON],
      showAvatar: false,
    },
    notification: {
      disabled: true,
    },
  };

  const styles = {
    chatWindowStyle: {
      position: "fixed",
      right: "10px",
      maxWidth: "360px",
      minWidth: "280px",
      width: "90%",
    },
    chatButtonStyle: {
      background: `url(${robotIcon}), linear-gradient(135deg, #2E8B57 0%, #20B2AA 50%, #4682B4 100%)`,
      backgroundImage: `url(${robotIcon})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  };

  return (
    <Box>
      <ChatBot flow={flow} settings={settings} styles={styles} />
    </Box>
  );
};

export default ChatBotLayout;
