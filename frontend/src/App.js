import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  HomePage, 
  DiagnosticTestPage,
  StudyModePage,
  QuizPage, 
  HistoryPage, 
  QuizResultPage,
  CategorySelectionPage,
  LessonPage
} from "./components";

function App() {
  const [gameHistory, setGameHistory] = useState([]);
  const [userLevel, setUserLevel] = useState(null);
  const [diagnosticCompleted, setDiagnosticCompleted] = useState(false);
  const [currentQuizData, setCurrentQuizData] = useState(null);
  const [studyProgress, setStudyProgress] = useState({});

  // Load data from localStorage on app start
  useEffect(() => {
    const savedHistory = localStorage.getItem('eduquiz-history');
    const savedLevel = localStorage.getItem('eduquiz-level');
    const savedDiagnostic = localStorage.getItem('eduquiz-diagnostic');
    const savedProgress = localStorage.getItem('eduquiz-progress');

    if (savedHistory) {
      setGameHistory(JSON.parse(savedHistory));
    }
    if (savedLevel) {
      setUserLevel(JSON.parse(savedLevel));
    }
    if (savedDiagnostic) {
      setDiagnosticCompleted(JSON.parse(savedDiagnostic));
    }
    if (savedProgress) {
      setStudyProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('eduquiz-history', JSON.stringify(gameHistory));
  }, [gameHistory]);

  useEffect(() => {
    localStorage.setItem('eduquiz-level', JSON.stringify(userLevel));
  }, [userLevel]);

  useEffect(() => {
    localStorage.setItem('eduquiz-diagnostic', JSON.stringify(diagnosticCompleted));
  }, [diagnosticCompleted]);

  useEffect(() => {
    localStorage.setItem('eduquiz-progress', JSON.stringify(studyProgress));
  }, [studyProgress]);

  const addGameToHistory = (gameData) => {
    const newGame = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...gameData
    };
    setGameHistory(prev => [newGame, ...prev]);
  };

  const updateStudyProgress = (category, lesson, completed) => {
    setStudyProgress(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [lesson]: completed
      }
    }));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                diagnosticCompleted={diagnosticCompleted}
                userLevel={userLevel}
              />
            } 
          />
          
          <Route 
            path="/diagnostic" 
            element={
              <DiagnosticTestPage 
                setUserLevel={setUserLevel}
                setDiagnosticCompleted={setDiagnosticCompleted}
                addGameToHistory={addGameToHistory}
              />
            } 
          />
          
          <Route 
            path="/study" 
            element={
              <StudyModePage 
                userLevel={userLevel}
                studyProgress={studyProgress}
              />
            } 
          />
          
          <Route 
            path="/study/:category" 
            element={
              <LessonPage 
                userLevel={userLevel}
                studyProgress={studyProgress}
                updateStudyProgress={updateStudyProgress}
              />
            } 
          />
          
          <Route 
            path="/categories" 
            element={
              <CategorySelectionPage 
                userLevel={userLevel}
              />
            } 
          />
          
          <Route 
            path="/quiz/:category" 
            element={
              <QuizPage 
                userLevel={userLevel}
                currentQuizData={currentQuizData}
                setCurrentQuizData={setCurrentQuizData}
                addGameToHistory={addGameToHistory}
              />
            } 
          />
          
          <Route 
            path="/result" 
            element={
              <QuizResultPage 
                currentQuizData={currentQuizData}
              />
            } 
          />
          
          <Route 
            path="/history" 
            element={
              <HistoryPage 
                gameHistory={gameHistory}
                setGameHistory={setGameHistory}
              />
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;