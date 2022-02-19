import styled, { keyframes } from 'styled-components';

/* keywords
1. styled(): 다른 컴포넌트의 속성 값을 재 사용해야 할 경우
2. as: HTML 태그 내에 선언. as 내의 값으로 tag가 결정
3. attr(): 태그의 속성값을 정의
4. 생성한 컴포넌트명을 통해서도 css 정의가 가능 ex) Emoji
5. props을 통해서도 css 프로퍼티를 정해 줄 수 있음. ex) state selector(css selector)
6. animations: ex) keyframes`from {} to {}`
*/

const Father = styled.div`
  display: flex;
`

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const MySpan = styled.span`
  font-size: 36px;
`

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${rotateAnimation} linear 1s infinite;
  ${MySpan}{
    &:hover{
      font-size: 70px;
    }
  }
`

function App() {
   return (
     <Father>
       <Box>
         <MySpan>hello world</MySpan>
       </Box>
     </Father>
   )
}

export default App;
