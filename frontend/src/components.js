import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Official Colombian primary education subjects
const subjects = {
  matematicas: {
    title: "Matemáticas",
    color: "bg-blue-500",
    icon: "🔢",
    description: "Números, operaciones y geometría"
  },
  lenguaje: {
    title: "Lenguaje",
    color: "bg-red-500",
    icon: "📖",
    description: "Lectura, escritura y comunicación"
  },
  ciencias_naturales: {
    title: "Ciencias Naturales",
    color: "bg-green-500",
    icon: "🧪",
    description: "Seres vivos y medio ambiente"
  },
  ciencias_sociales: {
    title: "Ciencias Sociales",
    color: "bg-purple-500",
    icon: "🌍",
    description: "Historia, geografía y sociedad"
  },
  ingles: {
    title: "Inglés",
    color: "bg-orange-500",
    icon: "🇺🇸",
    description: "Idioma extranjero"
  }
};

// Diagnostic test questions (mixed subjects, no time limit)
const diagnosticQuestions = [
  {
    subject: "matematicas",
    grade: 3,
    question: "¿Cuántas manzanas hay en total si tengo 4 manzanas en una cesta y 3 en otra?",
    options: ["6", "7", "8", "5"],
    correct: 1,
    explanation: "4 + 3 = 7 manzanas en total"
  },
  {
    subject: "lenguaje",
    grade: 2,
    question: "¿Cuál palabra completa mejor la oración? 'El gato está __ durmiendo.'",
    options: ["en", "por", "es", "muy"],
    correct: 0,
    explanation: "El gato está EN durmiendo es la forma correcta"
  },
  {
    subject: "ciencias_naturales",
    grade: 4,
    question: "¿Cuál es la función principal del corazón en el cuerpo humano?",
    options: ["Digerir los alimentos", "Bombear la sangre", "Proteger los huesos", "Respirar"],
    correct: 1,
    explanation: "El corazón bombea la sangre por todo el cuerpo"
  },
  {
    subject: "ciencias_sociales",
    grade: 3,
    question: "¿Cuál es la capital de Colombia?",
    options: ["Medellín", "Bogotá", "Cali", "Barranquilla"],
    correct: 1,
    explanation: "Bogotá es la capital de Colombia"
  },
  {
    subject: "ingles",
    grade: 4,
    question: "¿Cómo se dice 'casa' en inglés?",
    options: ["Car", "House", "Dog", "Book"],
    correct: 1,
    explanation: "House significa casa en inglés"
  }
];

// Study content for each subject
const studyContent = {
  matematicas: {
    lessons: [
      {
        id: 1,
        title: "Números del 1 al 100",
        content: "Los números nos ayudan a contar. Empezamos con 1, 2, 3... hasta llegar a 100.",
        examples: ["1, 2, 3, 4, 5...", "10, 20, 30, 40, 50...", "51, 52, 53, 54, 55..."],
        practice: "Cuenta del 1 al 20 en voz alta"
      },
      {
        id: 2,
        title: "Suma y Resta",
        content: "La suma (+) une números. La resta (-) quita números.",
        examples: ["2 + 3 = 5", "5 - 2 = 3", "10 + 5 = 15"],
        practice: "Resuelve: 4 + 6 = ?"
      },
      {
        id: 3,
        title: "Figuras Geométricas",
        content: "Las figuras tienen formas diferentes: círculo, cuadrado, triángulo.",
        examples: ["⭕ Círculo", "⬜ Cuadrado", "🔺 Triángulo"],
        practice: "Busca objetos con estas formas en tu casa"
      }
    ]
  },
  lenguaje: {
    lessons: [
      {
        id: 1,
        title: "El Alfabeto",
        content: "El alfabeto tiene 27 letras. Cada letra tiene un sonido.",
        examples: ["A, B, C, D, E...", "Mayúsculas: A, B, C", "Minúsculas: a, b, c"],
        practice: "Escribe las vocales: A, E, I, O, U"
      },
      {
        id: 2,
        title: "Formar Palabras",
        content: "Las letras se juntan para formar palabras. Las palabras tienen significado.",
        examples: ["C-A-S-A = CASA", "P-E-R-R-O = PERRO", "L-I-B-R-O = LIBRO"],
        practice: "Forma una palabra con M-A-M-Á"
      },
      {
        id: 3,
        title: "Oraciones Simples",
        content: "Una oración expresa una idea completa. Empieza con mayúscula y termina con punto.",
        examples: ["El perro corre.", "María come pan.", "Los niños juegan."],
        practice: "Escribe una oración sobre tu familia"
      }
    ]
  },
  ciencias_naturales: {
    lessons: [
      {
        id: 1,
        title: "Los Seres Vivos",
        content: "Los seres vivos nacen, crecen, se reproducen y mueren. Necesitan agua, aire y alimento.",
        examples: ["Animales: perro, gato, pájaro", "Plantas: rosa, árbol, hierba", "Personas: niños, adultos"],
        practice: "Nombra 3 seres vivos que veas en tu casa"
      },
      {
        id: 2,
        title: "El Cuerpo Humano",
        content: "Nuestro cuerpo tiene partes importantes: cabeza, tronco, brazos y piernas.",
        examples: ["Cabeza: ojos, nariz, boca", "Tronco: pecho, estómago", "Extremidades: brazos, piernas"],
        practice: "Toca cada parte de tu cuerpo mientras la nombras"
      },
      {
        id: 3,
        title: "El Medio Ambiente",
        content: "El medio ambiente es todo lo que nos rodea: aire, agua, tierra, plantas y animales.",
        examples: ["Agua: ríos, lluvia, mar", "Aire: viento, respiración", "Tierra: suelo, rocas"],
        practice: "Cuida el agua cerrando la llave"
      }
    ]
  },
  ciencias_sociales: {
    lessons: [
      {
        id: 1,
        title: "Mi Familia",
        content: "La familia es importante. Está formada por papá, mamá, hermanos y otros parientes.",
        examples: ["Papá y mamá", "Hermanos y hermanas", "Abuelos y tíos"],
        practice: "Dibuja a tu familia"
      },
      {
        id: 2,
        title: "Mi Comunidad",
        content: "Vivimos en una comunidad con vecinos, escuela, parque y tiendas.",
        examples: ["Escuela: donde aprendemos", "Parque: donde jugamos", "Tienda: donde compramos"],
        practice: "Camina por tu barrio con un adulto"
      },
      {
        id: 3,
        title: "Colombia, Mi País",
        content: "Colombia es nuestro país. Tiene montañas, ríos, ciudades y mucha gente.",
        examples: ["Bogotá: la capital", "Río Magdalena", "Montañas de los Andes"],
        practice: "Aprende los colores de la bandera colombiana"
      }
    ]
  },
  ingles: {
    lessons: [
      {
        id: 1,
        title: "Saludos en Inglés",
        content: "Aprendamos a saludar en inglés. Es importante ser amigable.",
        examples: ["Hello = Hola", "Good morning = Buenos días", "Goodbye = Adiós"],
        practice: "Saluda a alguien diciendo 'Hello'"
      },
      {
        id: 2,
        title: "Números en Inglés",
        content: "Los números en inglés son diferentes. Vamos a aprender del 1 al 10.",
        examples: ["1 = One", "2 = Two", "3 = Three", "4 = Four", "5 = Five"],
        practice: "Cuenta del 1 al 5 en inglés"
      },
      {
        id: 3,
        title: "Colores en Inglés",
        content: "Los colores nos ayudan a describir las cosas. Cada color tiene un nombre en inglés.",
        examples: ["Red = Rojo", "Blue = Azul", "Green = Verde", "Yellow = Amarillo"],
        practice: "Nombra el color de tu camiseta en inglés"
      }
    ]
  }
};

// Quiz questions by subject and grade level (ICFES style)
const quizQuestions = {
  matematicas: [
    {
      grade: 1,
      question: "¿Cuántas flores hay en total si tengo 2 flores rojas y 3 flores azules?",
      options: ["4", "5", "6", "7"],
      correct: 1,
      explanation: "2 + 3 = 5 flores en total"
    },
    {
      grade: 2,
      question: "¿Cuál número viene después del 19?",
      options: ["18", "20", "21", "22"],
      correct: 1,
      explanation: "Después del 19 viene el 20"
    },
    {
      grade: 3,
      question: "Si tengo 15 caramelos y le doy 5 a mi hermana, ¿cuántos me quedan?",
      options: ["8", "9", "10", "11"],
      correct: 2,
      explanation: "15 - 5 = 10 caramelos"
    },
    {
      grade: 4,
      question: "¿Cuánto es 6 × 4?",
      options: ["20", "22", "24", "26"],
      correct: 2,
      explanation: "6 × 4 = 24"
    },
    {
      grade: 5,
      question: "¿Cuánto es 48 ÷ 6?",
      options: ["6", "7", "8", "9"],
      correct: 2,
      explanation: "48 ÷ 6 = 8"
    }
  ],
  lenguaje: [
    {
      grade: 1,
      question: "¿Cuál es una vocal?",
      options: ["B", "A", "M", "P"],
      correct: 1,
      explanation: "A es una vocal. Las vocales son A, E, I, O, U"
    },
    {
      grade: 2,
      question: "¿Cuál palabra está escrita correctamente?",
      options: ["kasa", "casa", "caza", "kaza"],
      correct: 1,
      explanation: "CASA se escribe con C y S"
    },
    {
      grade: 3,
      question: "¿Cuál es el opuesto de 'grande'?",
      options: ["alto", "pequeño", "ancho", "largo"],
      correct: 1,
      explanation: "El opuesto de grande es pequeño"
    },
    {
      grade: 4,
      question: "¿Cuál oración está correcta?",
      options: ["el perro corre", "El perro corre.", "El perro corre", "el perro corre."],
      correct: 1,
      explanation: "Las oraciones empiezan con mayúscula y terminan con punto"
    },
    {
      grade: 5,
      question: "¿Cuál es el sujeto en la oración 'Los niños juegan en el parque'?",
      options: ["juegan", "Los niños", "en el parque", "parque"],
      correct: 1,
      explanation: "El sujeto es quien realiza la acción: Los niños"
    }
  ],
  ciencias_naturales: [
    {
      grade: 1,
      question: "¿Qué necesitan las plantas para crecer?",
      options: ["Solo agua", "Solo sol", "Agua y sol", "Solo tierra"],
      correct: 2,
      explanation: "Las plantas necesitan agua, sol y tierra para crecer"
    },
    {
      grade: 2,
      question: "¿Cuántos sentidos tenemos?",
      options: ["3", "4", "5", "6"],
      correct: 2,
      explanation: "Tenemos 5 sentidos: vista, oído, olfato, gusto y tacto"
    },
    {
      grade: 3,
      question: "¿Dónde viven los peces?",
      options: ["En el aire", "En el agua", "En la tierra", "En los árboles"],
      correct: 1,
      explanation: "Los peces viven en el agua"
    },
    {
      grade: 4,
      question: "¿Cuál es el órgano que nos ayuda a respirar?",
      options: ["Corazón", "Pulmones", "Estómago", "Cerebro"],
      correct: 1,
      explanation: "Los pulmones nos ayudan a respirar"
    },
    {
      grade: 5,
      question: "¿Qué es la fotosíntesis?",
      options: ["Comer plantas", "Proceso que hacen las plantas con la luz", "Respirar", "Dormir"],
      correct: 1,
      explanation: "La fotosíntesis es el proceso donde las plantas usan la luz solar para crear alimento"
    }
  ],
  ciencias_sociales: [
    {
      grade: 1,
      question: "¿Quién es el miembro mayor de la familia?",
      options: ["Hermano", "Papá", "Abuelo", "Primo"],
      correct: 2,
      explanation: "El abuelo es generalmente el miembro mayor de la familia"
    },
    {
      grade: 2,
      question: "¿Dónde vamos a aprender?",
      options: ["Parque", "Escuela", "Tienda", "Casa"],
      correct: 1,
      explanation: "Vamos a la escuela para aprender"
    },
    {
      grade: 3,
      question: "¿Cuál es la capital de Colombia?",
      options: ["Medellín", "Bogotá", "Cali", "Cartagena"],
      correct: 1,
      explanation: "Bogotá es la capital de Colombia"
    },
    {
      grade: 4,
      question: "¿Cuáles son los colores de la bandera de Colombia?",
      options: ["Rojo, blanco, azul", "Amarillo, azul, rojo", "Verde, blanco, rojo", "Azul, blanco, rojo"],
      correct: 1,
      explanation: "La bandera de Colombia es amarilla, azul y roja"
    },
    {
      grade: 5,
      question: "¿Cuál es el río más importante de Colombia?",
      options: ["Río Cauca", "Río Magdalena", "Río Amazonas", "Río Orinoco"],
      correct: 1,
      explanation: "El río Magdalena es el río más importante de Colombia"
    }
  ],
  ingles: [
    {
      grade: 1,
      question: "¿Cómo se dice 'hola' en inglés?",
      options: ["Bye", "Hello", "Good", "Yes"],
      correct: 1,
      explanation: "Hello significa hola en inglés"
    },
    {
      grade: 2,
      question: "¿Cómo se dice 'casa' en inglés?",
      options: ["Car", "House", "Dog", "Cat"],
      correct: 1,
      explanation: "House significa casa en inglés"
    },
    {
      grade: 3,
      question: "¿Cómo se dice 'rojo' en inglés?",
      options: ["Blue", "Green", "Red", "Yellow"],
      correct: 2,
      explanation: "Red significa rojo en inglés"
    },
    {
      grade: 4,
      question: "¿Cómo se dice 'cinco' en inglés?",
      options: ["Four", "Five", "Six", "Seven"],
      correct: 1,
      explanation: "Five significa cinco en inglés"
    },
    {
      grade: 5,
      question: "¿Cuál es la forma correcta de preguntar el nombre?",
      options: ["How you name?", "What your name?", "What is your name?", "How is name?"],
      correct: 2,
      explanation: "What is your name? es la forma correcta de preguntar el nombre"
    }
  ]
};

// Home Page Component
export const HomePage = ({ diagnosticCompleted, userLevel }) => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (!diagnosticCompleted) {
      navigate('/diagnostic');
    } else {
      navigate('/categories');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md w-full">
        {/* Logo and Title */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-blue-600 mb-2">EduQuiz</h1>
          <p className="text-lg text-gray-600 font-medium">¡Aprende jugando!</p>
          {userLevel && (
            <p className="text-sm text-blue-500 bg-blue-100 px-3 py-1 rounded-full">
              Nivel detectado: Grado {userLevel}
            </p>
          )}
        </div>

        {/* Main Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleStartQuiz}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {!diagnosticCompleted ? '🎯 Empezar Test de Nivel' : 'Jugar'}
          </button>
          
          <button
            onClick={() => navigate('/study')}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            📚 Estudiar
          </button>
          
          <button
            onClick={() => navigate('/history')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            📊 Ver Historial
          </button>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-gray-500 mt-8">
          Cada partida ayuda en el progreso de datos tus grados
        </p>
      </div>
    </div>
  );
};

// Diagnostic Test Page (like Duolingo's placement test)
export const DiagnosticTestPage = ({ setUserLevel, setDiagnosticCompleted, addGameToHistory }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === diagnosticQuestions[currentQuestion].correct;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      question: diagnosticQuestions[currentQuestion],
      selected: answerIndex,
      correct: diagnosticQuestions[currentQuestion].correct,
      isCorrect: isCorrect
    };
    setAnswers(newAnswers);

    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
    if (currentQuestion < diagnosticQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      finishDiagnostic();
    }
  };

  const finishDiagnostic = () => {
    // Calculate user level based on performance
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const score = correctAnswers / diagnosticQuestions.length;
    
    let detectedLevel;
    if (score >= 0.8) detectedLevel = 5;
    else if (score >= 0.6) detectedLevel = 4;
    else if (score >= 0.4) detectedLevel = 3;
    else if (score >= 0.2) detectedLevel = 2;
    else detectedLevel = 1;

    setUserLevel(detectedLevel);
    setDiagnosticCompleted(true);
    
    // Add to history
    addGameToHistory({
      type: 'diagnostic',
      category: 'Test de Nivel',
      categoryName: 'Test de Nivel',
      score: correctAnswers,
      totalQuestions: diagnosticQuestions.length,
      detectedLevel: detectedLevel,
      answers: answers,
      completedAt: new Date().toLocaleString()
    });

    setShowResult(true);
  };

  if (showResult) {
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const detectedLevel = answers.length > 0 ? 
      (correctAnswers >= 4 ? 5 : correctAnswers >= 3 ? 4 : correctAnswers >= 2 ? 3 : correctAnswers >= 1 ? 2 : 1) : 1;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">¡Test Completado!</h2>
          <p className="text-gray-600 mb-6">
            Hemos detectado tu nivel de conocimiento
          </p>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Tu nivel detectado es:</p>
            <p className="text-3xl font-bold text-blue-600">Grado {detectedLevel}</p>
            <p className="text-sm text-gray-500 mt-2">
              Respuestas correctas: {correctAnswers}/{diagnosticQuestions.length}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/categories')}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              🎮 Empezar a Jugar
            </button>
            
            <button
              onClick={() => navigate('/study')}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              📚 Estudiar Primero
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-600">Test de Nivel</h2>
            <div className="text-sm text-gray-600">
              {currentQuestion + 1} de {diagnosticQuestions.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / diagnosticQuestions.length) * 100}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
            Sin tiempo límite - Responde lo mejor que puedas
          </p>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-4">
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {subjects[diagnosticQuestions[currentQuestion].subject].title}
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-6 text-gray-800">
            {diagnosticQuestions[currentQuestion].question}
          </h3>

          {/* Answer Options */}
          <div className="space-y-3">
            {diagnosticQuestions[currentQuestion].options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
              
              if (selectedAnswer === null) {
                buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
              } else if (index === diagnosticQuestions[currentQuestion].correct) {
                buttonClass += "border-green-500 bg-green-100 text-green-700";
              } else if (index === selectedAnswer) {
                buttonClass += "border-red-500 bg-red-100 text-red-700";
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={selectedAnswer !== null}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                </button>
              );
            })}
          </div>

          {/* Show explanation after answer */}
          {selectedAnswer !== null && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Explicación:</strong> {diagnosticQuestions[currentQuestion].explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Study Mode Page (like Duolingo's lessons)
export const StudyModePage = ({ userLevel, studyProgress }) => {
  const navigate = useNavigate();

  const getProgressPercentage = (subject) => {
    const subjectProgress = studyProgress[subject] || {};
    const totalLessons = studyContent[subject].lessons.length;
    const completedLessons = Object.values(subjectProgress).filter(Boolean).length;
    return Math.round((completedLessons / totalLessons) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-blue-600">Modo Estudio</h2>
              <p className="text-gray-600">Aprende antes de hacer el quiz</p>
              {userLevel && (
                <p className="text-sm text-blue-500 mt-1">
                  Nivel recomendado: Grado {userLevel}
                </p>
              )}
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Volver
            </button>
          </div>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(subjects).map(([key, subject]) => {
            const progress = getProgressPercentage(key);
            return (
              <div
                key={key}
                onClick={() => navigate(`/study/${key}`)}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{subject.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-800">{subject.title}</h3>
                      <p className="text-sm text-gray-600">{subject.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{progress}%</p>
                    <p className="text-xs text-gray-500">Progreso</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${subject.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  {studyContent[key].lessons.length} lecciones disponibles
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Individual Lesson Page
export const LessonPage = ({ userLevel, studyProgress, updateStudyProgress }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const subject = subjects[category];
  const lessons = studyContent[category].lessons;
  const lesson = lessons[currentLesson];

  const completeLesson = () => {
    updateStudyProgress(category, lesson.id, true);
    setLessonCompleted(true);
  };

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setLessonCompleted(false);
    } else {
      navigate('/study');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-blue-600 flex items-center space-x-2">
                <span>{subject.icon}</span>
                <span>{subject.title}</span>
              </h2>
              <p className="text-gray-600">Lección {currentLesson + 1} de {lessons.length}</p>
            </div>
            <button
              onClick={() => navigate('/study')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Volver
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className={`${subject.color} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${((currentLesson + 1) / lessons.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{lesson.title}</h3>
          
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-bold text-blue-800 mb-3">📖 Concepto:</h4>
              <p className="text-gray-700 leading-relaxed">{lesson.content}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-bold text-green-800 mb-3">✨ Ejemplos:</h4>
              <ul className="space-y-2">
                {lesson.examples.map((example, index) => (
                  <li key={index} className="text-gray-700 flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    {example}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <h4 className="font-bold text-yellow-800 mb-3">🎯 Práctica:</h4>
              <p className="text-gray-700">{lesson.practice}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex space-x-4">
            {!lessonCompleted ? (
              <button
                onClick={completeLesson}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex-1"
              >
                ✅ Marcar como Completada
              </button>
            ) : (
              <button
                onClick={nextLesson}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex-1"
              >
                {currentLesson < lessons.length - 1 ? '➡️ Siguiente Lección' : '🏁 Terminar'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Category Selection Page
export const CategorySelectionPage = ({ userLevel }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            ← Volver
          </button>
          <h2 className="text-3xl font-bold text-blue-600 mb-2">Selecciona una Materia</h2>
          <p className="text-gray-600">Elige la materia que quieres practicar</p>
          {userLevel && (
            <p className="text-sm text-blue-500 mt-2">
              Nivel recomendado: Grado {userLevel}
            </p>
          )}
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(subjects).map(([key, subject]) => (
            <div
              key={key}
              onClick={() => navigate(`/quiz/${key}`)}
              className={`${subject.color} hover:opacity-90 rounded-xl p-6 text-white cursor-pointer transition-all duration-200 transform hover:scale-105 shadow-lg`}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{subject.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{subject.title}</h3>
                <p className="text-lg opacity-90">{subject.description}</p>
                <p className="text-sm mt-2 opacity-75">5 preguntas</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Quiz Page Component
export const QuizPage = ({ userLevel, currentQuizData, setCurrentQuizData, addGameToHistory }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [answers, setAnswers] = useState([]);

  const subject = subjects[category];
  const questions = quizQuestions[category] || [];
  
  // Filter questions based on user level
  const filteredQuestions = questions.filter(q => 
    userLevel ? q.grade <= userLevel + 1 : q.grade <= 3
  ).slice(0, 5);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft, gameStarted]);

  const handleTimeUp = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      selected: null,
      correct: filteredQuestions[currentQuestion].correct,
      isCorrect: false
    };
    setAnswers(newAnswers);
    nextQuestion();
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === filteredQuestions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      selected: answerIndex,
      correct: filteredQuestions[currentQuestion].correct,
      isCorrect: isCorrect
    };
    setAnswers(newAnswers);

    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const gameData = {
      category: category,
      categoryName: subject.title,
      score: score,
      totalQuestions: filteredQuestions.length,
      answers: answers,
      completedAt: new Date().toLocaleString()
    };
    
    setCurrentQuizData(gameData);
    addGameToHistory(gameData);
    navigate('/result');
  };

  const startGame = () => {
    setGameStarted(true);
  };

  if (filteredQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No hay preguntas disponibles para esta materia</p>
          <button
            onClick={() => navigate('/categories')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Volver a Materias
          </button>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">{subject.icon}</div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">{subject.title}</h2>
          <p className="text-gray-600 mb-6">¿Estás listo para el desafío?</p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">• {filteredQuestions.length} preguntas</p>
            <p className="text-sm text-gray-500">• 30 segundos por pregunta</p>
            <p className="text-sm text-gray-500">• Formato tipo ICFES</p>
            {userLevel && (
              <p className="text-sm text-blue-500">• Nivel: Grado {userLevel}</p>
            )}
          </div>
          <button
            onClick={startGame}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg mt-6 transition-colors"
          >
            ¡Empezar Quiz!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-600 flex items-center space-x-2">
              <span>{subject.icon}</span>
              <span>{subject.title}</span>
            </h2>
            <div className="text-sm text-gray-600">
              {currentQuestion + 1} de {filteredQuestions.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className={`${subject.color} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
            ></div>
          </div>

          {/* Timer */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">Puntuación: {score}</div>
            <div className={`text-sm font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-green-500'}`}>
              ⏰ {timeLeft}s
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-4">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Grado {filteredQuestions[currentQuestion].grade}
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-6 text-gray-800">
            {filteredQuestions[currentQuestion].question}
          </h3>

          {/* Answer Options */}
          <div className="space-y-3">
            {filteredQuestions[currentQuestion].options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
              
              if (selectedAnswer === null) {
                buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
              } else if (index === filteredQuestions[currentQuestion].correct) {
                buttonClass += "border-green-500 bg-green-100 text-green-700";
              } else if (index === selectedAnswer) {
                buttonClass += "border-red-500 bg-red-100 text-red-700";
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={selectedAnswer !== null}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                </button>
              );
            })}
          </div>

          {/* Show explanation after answer */}
          {selectedAnswer !== null && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Explicación:</strong> {filteredQuestions[currentQuestion].explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Quiz Result Page
export const QuizResultPage = ({ currentQuizData }) => {
  const navigate = useNavigate();

  if (!currentQuizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No hay datos del quiz</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((currentQuizData.score / currentQuizData.totalQuestions) * 100);
  
  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A', color: 'text-green-600', message: '¡Excelente!' };
    if (percentage >= 80) return { grade: 'B', color: 'text-blue-600', message: '¡Muy bien!' };
    if (percentage >= 70) return { grade: 'C', color: 'text-yellow-600', message: '¡Bien!' };
    if (percentage >= 60) return { grade: 'D', color: 'text-orange-600', message: 'Puedes mejorar' };
    return { grade: 'F', color: 'text-red-600', message: 'Sigue practicando' };
  };

  const gradeInfo = getGrade(percentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Results Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-blue-600 mb-2">¡Quiz Completado!</h2>
            <p className="text-gray-600">{currentQuizData.categoryName}</p>
          </div>

          {/* Score Display */}
          <div className="mb-8">
            <div className="text-6xl font-bold text-blue-600 mb-2">{percentage}%</div>
            <div className={`text-2xl font-bold ${gradeInfo.color} mb-2`}>
              Calificación: {gradeInfo.grade}
            </div>
            <p className="text-lg text-gray-600">{gradeInfo.message}</p>
          </div>

          {/* Detailed Results */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Respuestas correctas</p>
                <p className="text-2xl font-bold text-green-600">{currentQuizData.score}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total de preguntas</p>
                <p className="text-2xl font-bold text-blue-600">{currentQuizData.totalQuestions}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => navigate('/categories')}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Jugar de Nuevo
            </button>
            
            <button
              onClick={() => navigate('/study')}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              📚 Estudiar más
            </button>
            
            <button
              onClick={() => navigate('/history')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Ver Historial
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// History Page Component
export const HistoryPage = ({ gameHistory, setGameHistory }) => {
  const navigate = useNavigate();

  const clearHistory = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todo el historial?')) {
      setGameHistory([]);
    }
  };

  const getGradeColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getCategoryIcon = (category) => {
    return subjects[category]?.icon || '📝';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-blue-600">Historial de Juegos</h2>
              <p className="text-gray-600">Revisa tu progreso y mejora</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        </div>

        {/* Statistics */}
        {gameHistory.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Estadísticas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{gameHistory.length}</p>
                <p className="text-sm text-gray-600">Juegos jugados</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {gameHistory.length > 0 ? Math.round(gameHistory.reduce((acc, game) => acc + (game.score / game.totalQuestions), 0) / gameHistory.length * 100) : 0}%
                </p>
                <p className="text-sm text-gray-600">Promedio general</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {gameHistory.length > 0 ? Math.max(...gameHistory.map(game => Math.round((game.score / game.totalQuestions) * 100))) : 0}%
                </p>
                <p className="text-sm text-gray-600">Mejor resultado</p>
              </div>
            </div>
          </div>
        )}

        {/* Game History List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Historial de Partidas</h3>
            {gameHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Borrar Historial
              </button>
            )}
          </div>

          {gameHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h4 className="text-xl font-bold text-gray-600 mb-2">No hay juegos registrados</h4>
              <p className="text-gray-500 mb-6">¡Comienza a jugar para ver tu progreso aquí!</p>
              <button
                onClick={() => navigate('/categories')}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Comenzar a Jugar
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {gameHistory.map((game, index) => (
                <div key={game.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getCategoryIcon(game.category)}</div>
                      <div>
                        <h4 className="font-bold text-gray-800">{game.categoryName}</h4>
                        <p className="text-sm text-gray-600">{game.completedAt}</p>
                        {game.type === 'diagnostic' && (
                          <p className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded mt-1">
                            Test de Nivel - Grado {game.detectedLevel}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getGradeColor(game.score, game.totalQuestions)}`}>
                        {Math.round((game.score / game.totalQuestions) * 100)}%
                      </div>
                      <p className="text-sm text-gray-600">
                        {game.score}/{game.totalQuestions} correctas
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};