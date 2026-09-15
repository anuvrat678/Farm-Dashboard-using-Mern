
import { Link } from "react-router";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  
  gap: 30px;
`;

const Hero = styled.section`
  background: linear-gradient(135deg, #1b4332, #40916c);
  color: white;
  padding: 45px;
//   border-radius: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;

  @media (max-width: 700px) {
    padding: 30px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeroContent = styled.div`
  max-width: 650px;
`;

const Badge = styled.span`
  display: inline-block;
  background: #d8f3dc;
  color: #1b4332;
  padding: 7px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
`;

const HeroTitle = styled.h1`
  font-size: 42px;
  margin: 18px 0 12px;

  @media (max-width: 700px) {
    font-size: 32px;
  }
`;

const HeroText = styled.p`
  font-size: 17px;
  line-height: 1.6;
  color: #d8f3dc;
`;

const HeroIcon = styled.div`
  font-size: 100px;

  @media (max-width: 700px) {
    font-size: 65px;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  background: white;
  color: #1b4332;
  padding: 13px 22px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 15px;

  &:hover {
    background: #d8f3dc;
  }
`;

const SectionTitle = styled.h2`
  color: #1b4332;
  font-size: 25px;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 15px;
  border: 1px solid #d8e8dc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const StatIcon = styled.div`
  font-size: 30px;
`;

const StatTitle = styled.p`
  color: #52796f;
  margin: 15px 0 5px;
`;

const StatValue = styled.h3`
  font-size: 32px;
  color: #1b4332;
  margin: 0;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled(Link)`
  background: white;
  border: 1px solid #d8e8dc;
  border-radius: 15px;
  padding: 25px;
  text-decoration: none;
  color: #1b4332;

  &:hover {
    border-color: #40916c;
    transform: translateY(-3px);
  }
`;

const ActionIcon = styled.div`
  font-size: 35px;
  margin-bottom: 12px;
`;

const ActionTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 20px;
`;

const ActionText = styled.p`
  color: #52796f;
  margin: 0;
  line-height: 1.5;
`;


function HomePage() {
  return (
    <Page>
      <Hero>
        <HeroContent>
          <Badge>🌱 FARM MANAGEMENT SYSTEM</Badge>

          <HeroTitle>
            Welcome to Your Farm Dashboard
          </HeroTitle>

          <HeroText>
            Manage your farmers and agricultural products
            from one simple and organized dashboard.
          </HeroText>

          <Button to="/farmer">
            Explore Farmers →
          </Button>
        </HeroContent>

        <HeroIcon>🌾</HeroIcon>
      </Hero>

      <SectionTitle>Dashboard Overview</SectionTitle>

      <StatsGrid>
        <StatCard>
          <StatIcon>👨‍🌾</StatIcon>
          <StatTitle>Total Farmers</StatTitle>
          <StatValue>5</StatValue>
        </StatCard>

        <StatCard>
          <StatIcon>🥕</StatIcon>
          <StatTitle>Total Products</StatTitle>
          <StatValue>10</StatValue>
        </StatCard>

        <StatCard>
          <StatIcon>🌱</StatIcon>
          <StatTitle>Farm Categories</StatTitle>
          <StatValue>3</StatValue>
        </StatCard>
      </StatsGrid>

      <SectionTitle>Quick Actions</SectionTitle>

      <QuickActions>
        <ActionCard to="/farmer">
          <ActionIcon>👨‍🌾</ActionIcon>
          <ActionTitle>Manage Farmers</ActionTitle>
          <ActionText>
            View farmer details, locations, and
            farmer records.
          </ActionText>
        </ActionCard>

        <ActionCard to="/product">
          <ActionIcon>📦</ActionIcon>
          <ActionTitle>Manage Products</ActionTitle>
          <ActionText>
            View agricultural products, categories,
            and quantities.
          </ActionText>
        </ActionCard>
      </QuickActions>

    </Page>
  );
}

export default HomePage;