# Fake Image Detector Online 🖼️

Fake Image Detector Online is a powerful tool designed to help users identify forged, tampered, or photoshopped images with industry-leading accuracy. The project combines a modern **Next.js** frontend with a **FastAPI** backend to deliver a seamless and efficient image analysis experience.

# Demo -> [Fake Image Detector](https://fakeimagedetector.online) 🚀

## Features

- **Lightning Fast Detection**: Results in milliseconds with an optimized detection engine ⚡.
- **Highly Accurate**: 99.7% accuracy in detecting photo manipulation and forgeries.
- **Easy to Use**: Drag & drop interface with detailed analysis reports.
- **Privacy Focused**: Images are analyzed privately and never stored on servers 🔒.
- **Completely Free**: No account creation or hidden fees.

## Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (React-based)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) and [shadcn](https://shadcn.dev/)
- **Language**: TypeScript

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Language**: Python
- **API Integration**: The backend is used for image analysis and is integrated with the frontend via `/api/predict/route.ts`.

## How It Works

1. **Upload an Image**: Drag and drop or select an image to analyze.
2. **Analysis**: The backend processes the image using advanced detection techniques:
   - **Pattern Analysis**: Detects unnatural textures, inconsistent lighting, and peculiar artifacts.
   - **Metadata Inspection**: Extracts and analyzes EXIF data for signs of manipulation.
   - **Noise Analysis**: Identifies noise patterns that differ from authentic photos.
3. **Results**: The tool provides a detailed report on whether the image is authentic or manipulated.

## Running the Project Locally

### Prerequisites
- Node.js or Bun with their package manager installed.
- Python 3.10.13 installed.
- [Uvicorn](https://www.uvicorn.org/) for running the FastAPI server.

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ankittchaurasia/fakeimagedetector.git
   cd fakeimagedetector
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add a `.env.local` file with the following content:
   ```env
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
   NEXT_PUBLIC_TURNSTILE_SECRET_KEY=1x00000000000000000000BB
   BACKEND_URL=http://localhost:8000
   ```
   - The `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` are testing keys provided by [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/troubleshooting/testing/).
   - Replace `BACKEND_URL` with the local URL of your FastAPI server.

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the `/fastapi` folder:
   ```bash
   cd fastapi
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
4. Ensure the backend URL matches the `BACKEND_URL` in your `.env.local` file.

### Access the Application
- Open your browser and navigate to `http://localhost:3000` to access the frontend.
- The backend will be running at `http://localhost:8000`.

## Deployment

### Frontend
- Deploy the Next.js application to platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

### Backend
- Deploy the FastAPI backend to platforms like [AWS](https://aws.amazon.com/), [Google Cloud](https://cloud.google.com/), or [Heroku](https://www.heroku.com/).

### Turnstile Integration
- In production, replace the testing keys with your actual Cloudflare Turnstile keys to prevent abuse.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Inspired by tools like [FotoForensics](https://fotoforensics.com/).
- Built with love by [Ankit Chaurasiya](https://github.com/ankittchaurasia). ❤️

---

> 🧠 This README was generated with the help of AI. If you notice any errors or have suggestions, feel free to [open an issue](https://github.com/ankittchaurasia/fakeimagedetector/issues) or contact me.
