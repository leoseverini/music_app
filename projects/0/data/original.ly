\version "2.18.2"
\language "english"

notes = {c'4 e'4 f'2 e'4 d'8 c'8 a4 b2 c'1 }

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
