import dogImg from "./dog.png"; 

export default function Kewl() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-primary text-white gap-5">
      <h1 className="text-2xl font-bold">Something Cool!</h1>
      <p>I have a dog (she's a chocolate lab)😎😎😎</p>
      <img src={dogImg.src} alt="My Dog" className="w-64 h-64 object-cover rounded-lg shadow-lg" />
    </div>
  );
}