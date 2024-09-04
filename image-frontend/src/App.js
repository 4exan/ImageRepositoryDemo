import axios from "axios";
import { useState } from "react";
import "./App.css";
import ImageService from "./components/service/ImageService";

export default function App() {
  const [selectedFile, setselectedFile] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFileChange = (event) => {
    setselectedFile(event.target.files[0]);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${ImageService.BASE_URL}/image/${searchQuery}`,
        {
          responseType: "blob", // Отримуємо відповідь у вигляді Blob
        }
      );

      // Створюємо об'єкт URL з Blob та зберігаємо його в стані
      const imageUrl = URL.createObjectURL(response.data);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
      setDisplayImage(null); // Очищаємо попереднє зображення, якщо є помилка
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      ImageService.uploadImage(formData);
    }
  };

  return (
    <div className="container">
      <div className="child">
        <h2 className="child-title">Upload image:</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="file"
              accept="image/*"
              id="file"
              name="file"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
      <div className="child">
        <h2 className="child-title">Upload image:</h2>
        <div>
          <input
            type="text"
            placeholder="Search for image"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div>
          {displayImage ? (
            <img src={displayImage} alt="Searched" className="image" />
          ) : (
            <p>No image to display</p>
          )}
        </div>
      </div>
    </div>
  );
}
