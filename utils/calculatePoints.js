export function calculatePoints(selectedAnswers, question) {
  const correctAnswers = question.correctAnswers.map(String);
  const points = question.points;
  const totalCorrect = correctAnswers.length;

  const pointsPerCorrectAnswer = points / totalCorrect;
  const correctCount = selectedAnswers.filter((answer) =>
    correctAnswers.includes(answer)
  ).length;
  const incorrectCount = selectedAnswers.filter(
    (answer) => !correctAnswers.includes(answer)
  ).length;

  const allSelected = selectedAnswers.length === question.answers.length;

  if (allSelected) return 0;

  const penalty = ((-0.66 * points) / totalCorrect) * incorrectCount;

  if (correctCount === totalCorrect && incorrectCount === 0) return points;
  if (correctCount === 0) return 0;

  const scoreFromCorrectAnswers = pointsPerCorrectAnswer * correctCount;
  return Math.max(scoreFromCorrectAnswers + penalty, 0);
}
