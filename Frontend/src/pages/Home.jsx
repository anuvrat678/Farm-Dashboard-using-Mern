import styled from "styled-components";
import { Link } from "react-router";

import PageLayout from "../components/styled/PageLayout.jsx";

import {
  SectionHeading,
  Eyebrow,
  SectionTitle,
  SectionDescription,
} from "../components/styled/SectionTitle.jsx";

import {
  StatCard,
  StatTop,
  StatIcon,
  StatLabel,
  StatValue,
} from "../components/styled/StatCard.jsx";

import {
  PrimaryButton,
  SecondaryButton,
} from "../components/styled/Button.jsx";


const Hero = styled.section`
  position: relative;
  overflow: hidden;

  padding: 55px;

  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 24px;

  background:
    linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.78),
      rgba(229, 238, 232, 0.58)
    );

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  box-shadow:
    0 20px 45px rgba(44, 62, 54, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);

  display: grid;
  grid-template-columns: 1.5fr 0.8fr;
  gap: 40px;
  align-items: center;

  &::before {
    content: "";

    position: absolute;

    width: 260px;
    height: 260px;

    top: -130px;
    right: 80px;

    border-radius: 50%;

    background: rgba(122, 160, 143, 0.14);

    filter: blur(10px);
  }

  &::after {
    content: "";

    position: absolute;

    width: 180px;
    height: 180px;

    bottom: -100px;
    right: 300px;

    border-radius: 50%;

    background: rgba(184, 168, 124, 0.12);

    filter: blur(12px);
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    padding: 40px;
  }

  @media (max-width: 600px) {
    padding: 30px;
    border-radius: 18px;
  }
`;


const HeroContent = styled.div`
  position: relative;
  z-index: 2;
`;


const Badge = styled.span`
  display: inline-flex;

  padding: 7px 12px;

  border: 1px solid #cbd8d0;
  border-radius: 50px;

  background: rgba(255, 255, 255, 0.55);

  color: #52796f;

  font-size: 11px;
  font-weight: 700;

  letter-spacing: 1.1px;
`;


const HeroTitle = styled.h1`
  max-width: 700px;

  margin: 20px 0 15px;

  color: #26352d;

  font-size: clamp(38px, 5vw, 58px);
  line-height: 1.05;

  letter-spacing: -2px;

  font-weight: 750;
`;


const Highlight = styled.span`
  color: #52796f;
`;


const HeroText = styled.p`
  max-width: 570px;

  margin: 0;

  color: #64746c;

  font-size: 16px;
  line-height: 1.7;
`;


const ButtonGroup = styled.div`
  display: flex;

  gap: 12px;

  margin-top: 27px;

  flex-wrap: wrap;
`;


const HeroPanel = styled.div`
  position: relative;
  z-index: 2;

  padding: 25px;

  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.42);

  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);

  box-shadow:
    0 12px 30px rgba(44, 62, 54, 0.07),
    inset 0 1px 0 rgba(255, 255, 255, 0.75);
`;


const PanelLabel = styled.p`
  margin: 0 0 20px;

  color: #718078;

  font-size: 11px;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 1px;
`;


const PanelItem = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding: 14px 0;

  border-bottom: 1px solid rgba(82, 121, 111, 0.13);

  &:last-child {
    border-bottom: none;
  }
`;


const PanelName = styled.span`
  color: #52635b;

  font-size: 13px;
  font-weight: 600;
`;


const PanelValue = styled.span`
  color: #26352d;

  font-size: 19px;
  font-weight: 750;
`;


const ActionsGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 18px;

  margin-top: 22px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;


const ActionCard = styled(Link)`
  padding: 26px;

  border: 1px solid #d7e0da;
  border-radius: 16px;

  background: rgba(255, 255, 255, 0.72);

  color: #26352d;

  text-decoration: none;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);

    border-color: #a7bdb0;

    box-shadow: 0 12px 28px rgba(44, 62, 54, 0.08);
  }
`;


const ActionNumber = styled.span`
  display: block;

  margin-bottom: 20px;

  color: #82988c;

  font-size: 11px;
  font-weight: 800;

  letter-spacing: 1.2px;
`;


const ActionTitle = styled.h3`
  margin: 0 0 8px;

  color: #304139;

  font-size: 20px;
`;


const ActionText = styled.p`
  margin: 0;

  color: #718078;

  font-size: 14px;

  line-height: 1.6;
`;


const HomePage = () => {
  return (
    <PageLayout>

      <Hero>

        <HeroContent>

          <Badge>
            FARM MANAGEMENT SYSTEM
          </Badge>

          <HeroTitle>
            Farm records,
            <br />
            <Highlight>organized simply.</Highlight>
          </HeroTitle>

          <HeroText>
            Manage farmers, agricultural products,
            locations and quantities from one clean
            and organized dashboard.
          </HeroText>

          <ButtonGroup>

            <PrimaryButton to="/farmer">
              View Farmers
            </PrimaryButton>

            <SecondaryButton to="/product">
              View Products
            </SecondaryButton>

          </ButtonGroup>

        </HeroContent>


        <HeroPanel>

          <PanelLabel>
            Current Overview
          </PanelLabel>

          <PanelItem>
            <PanelName>
              Registered Farmers
            </PanelName>

            <PanelValue>
              05
            </PanelValue>
          </PanelItem>

          <PanelItem>
            <PanelName>
              Farm Products
            </PanelName>

            <PanelValue>
              10
            </PanelValue>
          </PanelItem>

          <PanelItem>
            <PanelName>
              Categories
            </PanelName>

            <PanelValue>
              03
            </PanelValue>
          </PanelItem>

        </HeroPanel>

      </Hero>


      <section>

        <SectionHeading>

          <Eyebrow>
            Overview
          </Eyebrow>

          <SectionTitle>
            Dashboard Statistics
          </SectionTitle>

          <SectionDescription>
            A quick look at your current farm records.
          </SectionDescription>

        </SectionHeading>


        <div className="stats-grid">

          <StatCard>

            <StatTop>
              <StatIcon>
                01
              </StatIcon>
            </StatTop>

            <StatLabel>
              Total Farmers
            </StatLabel>

            <StatValue>
              05
            </StatValue>

          </StatCard>


          <StatCard>

            <StatTop>
              <StatIcon>
                02
              </StatIcon>
            </StatTop>

            <StatLabel>
              Total Products
            </StatLabel>

            <StatValue>
              10
            </StatValue>

          </StatCard>


          <StatCard>

            <StatTop>
              <StatIcon>
                03
              </StatIcon>
            </StatTop>

            <StatLabel>
              Farm Categories
            </StatLabel>

            <StatValue>
              03
            </StatValue>

          </StatCard>

        </div>

      </section>


      <section>

        <SectionHeading>

          <Eyebrow>
            Navigation
          </Eyebrow>

          <SectionTitle>
            Quick Actions
          </SectionTitle>

          <SectionDescription>
            Access commonly used farm management sections.
          </SectionDescription>

        </SectionHeading>


        <ActionsGrid>

          <ActionCard to="/farmer">

            <ActionNumber>
              01 / FARMERS
            </ActionNumber>

            <ActionTitle>
              Manage Farmers
            </ActionTitle>

            <ActionText>
              View farmer information, locations,
              ages, and registered farm records.
            </ActionText>

          </ActionCard>


          <ActionCard to="/product">

            <ActionNumber>
              02 / PRODUCTS
            </ActionNumber>

            <ActionTitle>
              Manage Products
            </ActionTitle>

            <ActionText>
              View agricultural products, categories,
              and available quantities.
            </ActionText>

          </ActionCard>

        </ActionsGrid>

      </section>

    </PageLayout>
  );
};

export default HomePage;