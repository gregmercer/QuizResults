TestNumber,SelectedWords,CorrectWords,NumCorrect,NonItems,NumNonItems,IncorrectlyMarked,NumIncorrectlyMarked
TestNumber, NumberDistractorWords, NumberCorrectWords, NumberIncorrectWords, SelectedWords, DistractorWords, CorrectWords, IncorrectWords

TestNumber, NumberDistractorWords, NumberCorrectlySelected, NumberIncorrectlySelected, NumberCorrectlyIndentified, 
SelectedWords, DistractorWords, CorrectlySelectedWords, IncorrectlySelectedWords, CorrectlyIndentifiedWords

CREATE TABLE `quiz_word_results` (
  `TestNumber` varchar(4096) DEFAULT NULL,
  `NumberDistractorWords` text DEFAULT NULL,  
  `NumberCorrectlySelected` text DEFAULT NULL,
  `NumberIncorrectlySelected` text DEFAULT NULL,
  `NumberCorrectlyIndentified` text DEFAULT NULL,
  `SelectedWords` text DEFAULT NULL,
  `DistractorWords` text DEFAULT NULL,  
  `CorrectlySelectedWords` text DEFAULT NULL,
  `IncorrectlySelectedWords` text DEFAULT NULL,  
  `CorrectlyIndentifiedWords` text DEFAULT NULL    
) ENGINE=InnoDB DEFAULT CHARSET=latin1;





