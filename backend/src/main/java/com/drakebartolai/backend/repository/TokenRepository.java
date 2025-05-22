package com.drakebartolai.backend.repository;

import com.drakebartolai.backend.model.Token;
import com.drakebartolai.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TokenRepository extends JpaRepository<Token, UUID> {

    List<Token> findAllByUser(User user);

    Optional<Token> findByToken(String token);

    @Modifying
    @Transactional
    @Query("UPDATE Token t SET t.expired = true, t.revoked = true WHERE t.user = :user AND (t.expired = false OR t.revoked = false)")
    void revokeAllTokensForUser(User user);
}
