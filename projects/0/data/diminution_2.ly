\version "2.18.2"
\language "english"

notes = {c'2 e'2 f'1 e'2 d'4 c'4 a2 b1 c'\breve }

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
