package org.jad.boquetd.service;

import lombok.RequiredArgsConstructor;
import org.jad.boquetd.dto.LoginRequestDTO;
import org.jad.boquetd.dto.UserRequestDTO;
import org.jad.boquetd.dto.UserResponseDTO;
import org.jad.boquetd.entity.User;
import org.jad.boquetd.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponseDTO inscrire(UserRequestDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Un utilisateur avec cet email existe déjà !");
        }

        User user = User.builder()
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .adresse(dto.getAdresse())
                .build();

        User saved = userRepository.save(user);

        return UserResponseDTO.builder()
                .id(saved.getId())
                .email(saved.getEmail())
                .nom(saved.getNom())
                .prenom(saved.getPrenom())
                .adresse(saved.getAdresse())
                .build();
    }


    // Exemple d'implémentation de la méthode login
    public Optional<UserResponseDTO> login(LoginRequestDTO dto) {
        // Trouver l'utilisateur par email
        User user = userRepository.findByEmail(dto.getEmail());

        if (user != null && passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            // Si l'utilisateur est trouvé et le mot de passe est correct, retourner un UserResponseDTO
            UserResponseDTO userResponseDTO = UserResponseDTO.builder()
                    .id(user.getId())
                    .email(user.getEmail())
                    .nom(user.getNom())
                    .prenom(user.getPrenom())
                    .adresse(user.getAdresse())
                    .build();
            return Optional.of(userResponseDTO);
        } else {
            // Retourner Optional.empty() si l'authentification échoue
            return Optional.empty();
        }
    }
}
