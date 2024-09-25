"use client";

import { Admin, Resource, radiantLightTheme, radiantDarkTheme } from "react-admin"; 
import simpleRestProvider from "ra-data-simple-rest";
import { Sidebar, AppBar, Layout, UserMenu, MenuItemLink, useResourceDefinitions } from "react-admin"; 
import { deepmerge } from "@mui/utils";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import { ChallengeCreate } from "./challenge/create";
import { ChallengeEdit } from "./challenge/edit";
import { ChallengeList } from "./challenge/list";
import { ChallengeOptionCreate } from "./challengeOption/create";
import { ChallengeOptionEdit } from "./challengeOption/edit";
import { ChallengeOptionsList } from "./challengeOption/list";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";
import { CourseList } from "./course/list";
import { LessonCreate } from "./lesson/create";
import { LessonEdit } from "./lesson/edit";
import { LessonList } from "./lesson/list";
import { UnitCreate } from "./unit/create";
import { UnitEdit } from "./unit/edit";
import { UnitList } from "./unit/list";

// Dynamically get the backend URL from the environment variable
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

// Configure the data provider with the backend URL
const dataProvider = simpleRestProvider(`${backendUrl}`);

// Custom theme with green as the primary color
const customTheme = deepmerge(radiantLightTheme, {

  spacing: 8,
  typography: {
      fontFamily: "Nunito, -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif",
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 300, 
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          height: 50, // Increase the height of each item in the sidebar
          paddingLeft: 20, // Add padding to the left
          paddingRight: 20, // Add padding to the right
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "1.1rem", // Increase the font size of the sidebar text
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: "1.5rem", // Increase the size of icons
        },
      },
    },
  },
  sidebar: {
    width: 280, 
    closedWidth: 50, 
},
});

// Custom Layout component (if needed)
const MyAppBar = (props: any) => (
      <AppBar {...props} className="bg-green-500">
        <span className="flex-1 text-[35px] font-extrabold">Admin Panel</span>
        <UserMenu>
          <MenuItemLink to="/profile" primaryText="Profile" />
        </UserMenu> 
      </AppBar>
);

// Custom Menu Component to apply styles to Resource links
const MyMenu = (props: any) => {
  const resources = useResourceDefinitions();
  
  return (
    <div>
      {Object.keys(resources).map(name => (
        <MenuItemLink
          key={name}
          to={`/${name}`}
          primaryText={resources[name].options?.label || resources[name].name}
          leftIcon={<LibraryBooksIcon />}
          style={{
            height: 50, // Increase height of menu items
            fontSize: '1.2rem', // Increase font size of menu items
            padding: '20px 26px', // Add more padding
          }}
        />
      ))}
    </div>
  );
};

const MyLayout = (props: any) => (
        <Layout
          {...props}
          appBar={MyAppBar}
          sidebar={Sidebar}
          menu={MyMenu}
        />
);

const App = () => (
        <Admin
          theme={customTheme}
          darkTheme={radiantDarkTheme}
          layout={MyLayout}
          dataProvider={dataProvider}
        >
        <Resource
            name="courses"
            recordRepresentation="title"
            list={CourseList}
            create={CourseCreate}
            edit={CourseEdit}
            options={{ label: "Courses" }}
        />

        <Resource
            name="units"
            recordRepresentation="title"
            list={UnitList}
            create={UnitCreate}
            edit={UnitEdit}
            options={{ label: "Units" }}
        />

        <Resource
            name="lessons"
            recordRepresentation="title"
            list={LessonList}
            create={LessonCreate}
            edit={LessonEdit}
            options={{ label: "Lessons" }}
        />

        <Resource
            name="challenges"
            recordRepresentation="question"
            list={ChallengeList}
            create={ChallengeCreate}
            edit={ChallengeEdit}
            options={{ label: "Challenges" }}
        />

        <Resource
            name="challenge-options"
            recordRepresentation="text"
            list={ChallengeOptionsList}
            create={ChallengeOptionCreate}
            edit={ChallengeOptionEdit}
            options={{
                label: "Challenge Options",
            }}
        />
    </Admin>
);

export default App;
