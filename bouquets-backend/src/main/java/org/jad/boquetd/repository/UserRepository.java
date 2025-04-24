package org.jad.boquetd.repository;

import org.jad.boquetd.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findById(Long id);

}
