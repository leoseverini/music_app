\version "2.18.2"
\language "english"

notes = {c'8 e'8 f'4 e'8 d'16 c'16 a8 b4 c'2 }

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
