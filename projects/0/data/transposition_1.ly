\version "2.18.2"
\language "english"

notes = {cs'4 f'4 fs'2 f'4 ds'8 cs'8 as4 c'2 cs'1 }

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
