package net.quintoimpacto.ubuntuapi.chatbot.repository;

import net.quintoimpacto.ubuntuapi.chatbot.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IQuestionRepository extends JpaRepository<Question, Long> {

    List<Question>findAllByActive(boolean active);
}
