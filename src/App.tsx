import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Router from '../coin_tracker/src/Router';

/* keywords
1. styled(): 다른 컴포넌트의 속성 값을 재 사용해야 할 경우
2. as: HTML 태그 내에 선언. as 내의 값으로 tag가 결정
3. attr(): 태그의 속성값을 정의
4. 생성한 컴포넌트명을 통해서도 css 정의가 가능 ex) Emoji
5. props을 통해서도 css 프로퍼티를 정해 줄 수 있음. ex) state selector(css selector)
6. animations: ex) keyframes`from {} to {}`
7. ThemeProvider
*/

function App() {
  return (
    <Router/>
  )
}

export default App;
