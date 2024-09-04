package ua.kusakabe.image.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ua.kusakabe.image.service.ImageService;

import java.io.IOException;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile image) throws IOException {
        String uploadImage = imageService.uploadImage(image);
        return ResponseEntity.ok().body(uploadImage);
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<?> getImage(@PathVariable String fileName) {
        byte[] imageData = imageService.downloadImage(fileName);
        return ResponseEntity.ok().contentType(MediaType.valueOf(MediaType.IMAGE_PNG_VALUE)).body(imageData);
    }

}
