\version "2.18.2"
\language "english"

notes = {a'4 }

multiStaffA = \new Staff <<
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
