CREATE TABLE `quiz_flag_results` (
  `TestNumber` varchar(32) DEFAULT NULL,
  `Duplicates` varchar(3) DEFAULT NULL, 
  `DuplicateWords` text DEFAULT NULL,
  `NonBase` varchar(3) DEFAULT NULL, 
  `NonBaseWords` text DEFAULT NULL,
  `OutOfOrder` varchar(3) DEFAULT NULL, 
  `OutOfOrderWords` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;