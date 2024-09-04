package ua.kusakabe.image.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.kusakabe.image.entity.Image;

import java.util.Optional;

@Repository
@Transactional
public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByName(String name);
}
