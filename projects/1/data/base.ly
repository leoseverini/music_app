\version "2.18.2"
\language "english"

notes = {c4 f4 g'4 a'4 b'4 c'4 b4 }

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
