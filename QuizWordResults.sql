TestNumber,SelectedWords,CorrectWords,NumCorrect,NonItems,NumNonItems,IncorrectlyMarked,NumIncorrectlyMarked

CREATE TABLE `quiz_word_results` (
  `TestNumber` varchar(4096) DEFAULT NULL,
  `NumberCorrectWords` text DEFAULT NULL,
  `NumberIncorrectWords` text DEFAULT NULL,
  `SelectedWords` text DEFAULT NULL,
  `CorrectWords` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;





