\version "2.18.2"
\language "english"

notes = {c'16 e'16 f'8 e'16 d'32 c'32 a16 b8 c'4 }

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
