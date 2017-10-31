\version "2.18.2"
\language "english"

notes = {d'4 fs'4 g'2 fs'4 e'8 d'8 b4 cs'2 d'1 }

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
