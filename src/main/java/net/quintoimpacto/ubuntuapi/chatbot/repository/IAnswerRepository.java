package net.quintoimpacto.ubuntuapi.chatbot.repository;

import net.quintoimpacto.ubuntuapi.chatbot.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAnswerRepository extends JpaRepository<Answer,Long> {
}
