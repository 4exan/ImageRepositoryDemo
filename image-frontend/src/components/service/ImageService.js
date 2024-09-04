import axios from "axios";

export default class ImageService {
  static BASE_URL = "http://localhost:8080";

  static async downloadImage(name) {
    try {
      const response = await axios.get(
        `${ImageService.BASE_URL}/image/${name}`,
        {
          responseType: "blob",
        }
      );
      const imgUrl = URL.createObjectURL(response.data);
      return imgUrl;
    } catch (error) {
      throw error;
    }
  }

  static async uploadImage(formData) {
    try {
      const response = await axios.post(
        `${ImageService.BASE_URL}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
