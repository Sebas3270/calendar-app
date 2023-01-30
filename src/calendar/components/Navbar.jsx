
import styled from 'styled-components';
import { useAuthStore } from '../../hooks';

export const Navbar = () => {

  const { logOut, user } = useAuthStore();

  return (
    <NavLayout>
      <NavChildContainer>
        <div>
            <span>{ user.name }</span>
        </div>
        <div>
          <Title>Calendar</Title>
        </div>
        <SignOutContainer onClick={logOut}>
            <span>Sign Out</span>
        </SignOutContainer>
      </NavChildContainer>
    </NavLayout>
  )
}


const NavLayout = styled.nav`
  height: 85px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #252525;

  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
`;

const NavChildContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 20px;

  color: white;
`

const Title = styled.span`
  font-size: 30px;
  font-weight: 700;
`

const SignOutContainer = styled.div`
  /* background-color: white;
  color: #252525; */

  border: 1px solid white;

  padding: 5px 20px;
  border-radius: 7px;
  cursor: pointer;

`