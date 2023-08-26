import { Page } from "./models/page.js";
import { PageRol } from "./models/pageRole.js";
import { Rol } from "./models/rol.model.js";
import { User } from "./models/user.model.js";
import { UserRole } from "./models/userRole.js";
import { sequelize } from "./utils/db.js";

const users = [
  {
    username: process.env.USER_NAME_ADMIN,
    email: process.env.USER_EMAIL_ADMIN,
    password: process.env.USER_PASSWORD_ADMIN,
  },
];
const roles = [{ rol: "admin" }, { rol: "patient" }, { rol: "doctor" }];

const usersRoles = [{ userId: 1, rolId: 1 }];

const pages = [
  { menu: "Inicio", page: "Home", link: "/home" },
  { menu: "Usuarios", page: "Users", link: "/users" },
  { menu: "Agendar Cita", page: "Schedule Appointment", link: "/appointment" },
  {
    menu: "Resolver Cita",
    page: "Resolved Appointment",
    link: "/resolvedAppointment",
  },
];

const pagesRoles = [
  { pageId: 1, rolId: 1 },
  { pageId: 1, rolId: 2 },
  { pageId: 1, rolId: 3 },

  { pageId: 2, rolId: 1 },

  { pageId: 3, rolId: 2 },

  { pageId: 4, rolId: 3 },
];

async function seed() {
  try {
    await sequelize
      .query("SET FOREIGN_KEY_CHECKS = 0", { raw: true })
      .then(function (results) {
        sequelize.sync({ force: true });
      });

    await sequelize
      .sync({ force: true })
      .then(() => {
        pages.forEach(async (page) => {
          await Page.create(page);
        });
      })
      .then(() => {
        roles.forEach(async (rol) => {
          await Rol.create(rol);
        });
      })
      .then(() => {
        users.forEach(async (user) => {
          await User.create(user);
        });
      })
      .then(() => {
        pagesRoles.forEach(async (pageRol) => {
          await PageRol.create(pageRol);
        });
      })
      .then(() => {
        usersRoles.forEach(async (userRol) => {
          await UserRole.create(userRol);
        });
      });
  } catch (error) {
    console.log(`Error ${error}`);
  }
}
seed();
