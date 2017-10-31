\version "2.18.2"
\language "english"

notes = {c'1 e'1 f'\breve e'1 d'2 c'2 a1 b\breve c'\longa }

multiStaffA = \new Staff <<
  \override Staff.NoteHead.style = #'baroque
  \key c \major   
  \notes
>>

\score {
  <<    
    \multiStaffA
  >>
  \layout { 
  \context {
      \Staff
      whichBar = #""
      \remove "Time_signature_engraver"
    } 
  }  
}
