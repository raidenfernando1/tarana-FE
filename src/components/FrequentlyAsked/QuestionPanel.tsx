import styled from "@emotion/styled";
import QuestionCard from "./QuestionCard";
import fetchFrequentQuestions from "../../hooks/getFrequentQuestions";
import { useState, useEffect } from "react";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 30%;
`;

const Questions = styled.ul`
  padding-top: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: var(--gap-size);
  padding-right: var(--gap-size);
`;

export default function QuestionPanel() {
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    async function loadQuestions() {
      const data = await fetchFrequentQuestions();
      if (data) {
        setQuestions(data.map((item: { question: string }) => item.question));
      }
    }
    loadQuestions();
  }, []);

  return (
    <Container>
      <h1>Frequently Asked Questions</h1>
      <Questions>
        {questions.length === 0 ? (
          <p>Loading...</p>
        ) : (
          questions.map((q, i) => <QuestionCard key={i} question={q} />)
        )}
      </Questions>
    </Container>
  );
}
