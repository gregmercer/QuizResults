TestNumber,SelectedWords,CorrectWords,NumCorrect,NonItems,NumNonItems,IncorrectlyMarked,NumIncorrectlyMarked
TestNumber, NumberDistractorWords, NumberConfusionWords, NumberCorrectWords, NumberIncorrectWords, SelectedWords, DistractorWords, ConfusionWords, CorrectWords, IncorrectWords

TestNumber, NumberDistractorWords, NumberConfusionWords, NumberCorrectlySelected, NumberIncorrectlySelected, NumberCorrectlyIndentified, 
SelectedWords, DistractorWords, ConfusionWords, CorrectlySelectedWords, IncorrectlySelectedWords, CorrectlyIndentifiedWords

CREATE TABLE `quiz_word_results` (
  `TestNumber` varchar(4096) DEFAULT NULL,
  `NumberDistractorWords` text DEFAULT NULL,  
  `NumberConfusionWords` text DEFAULT NULL,  
  `NumberCorrectlySelected` text DEFAULT NULL,
  `NumberIncorrectlySelected` text DEFAULT NULL,
  `NumberCorrectlyIndentified` text DEFAULT NULL,
  `SelectedWords` text DEFAULT NULL,
  `DistractorWords` text DEFAULT NULL,  
  `ConfusionWords` text DEFAULT NULL,  
  `CorrectlySelectedWords` text DEFAULT NULL,
  `IncorrectlySelectedWords` text DEFAULT NULL,  
  `CorrectlyIndentifiedWords` text DEFAULT NULL    
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `quiz_word_practice_results` (
  `TestNumber` varchar(4096) DEFAULT NULL,
  `NumberCorrectlySelected` text DEFAULT NULL,
  `NumberIncorrectlySelected` text DEFAULT NULL,
  `NumberCorrectlyIndentified` text DEFAULT NULL,
  `SelectedWords` text DEFAULT NULL,
  `CorrectlySelectedWords` text DEFAULT NULL,
  `IncorrectlySelectedWords` text DEFAULT NULL,  
  `CorrectlyIndentifiedWords` text DEFAULT NULL    
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

