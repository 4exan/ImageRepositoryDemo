package ua.kusakabe.image.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.kusakabe.image.entity.Image;
import ua.kusakabe.image.repository.ImageRepository;
import ua.kusakabe.image.utils.ImageUtils;

import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;

@Service
@AllArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    public String uploadImage(MultipartFile imageFile) throws IOException {
        var imageToSave = Image.builder()
                .name(imageFile.getOriginalFilename())
                .type(imageFile.getContentType())
                .data(ImageUtils.compressImage(imageFile.getBytes()))
                .build();
        imageRepository.save(imageToSave);
        return "File uploaded successfully: " + imageFile.getOriginalFilename();
    }

    public byte[] downloadImage(String imageName){
        Optional<Image> dbImage = imageRepository.findByName(imageName);

        return dbImage.map(image -> {
            try{
                return ImageUtils.decompressImage(image.getData());
            }catch (DataFormatException | IOException exception){
                throw new RuntimeException(exception);
            }
        }).orElse(null);
    }

}
