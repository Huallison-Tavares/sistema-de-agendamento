import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  phoneNumber: text("phone_number"),
  street: text(),
  houseNumber: text("house_number"),
  complement: text(),
  referencePoint: text("reference_point"),
  neighborhood: text(),
  city: text(),
  isAdm: boolean("is_adm").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const userRelations = relations(userTable, ({ many }) => ({
  order: many(orderTable),
  sessions: many(sessionTable),
  accounts: many(accountTable),
}));

export const categoryTable = pgTable("categorys", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
});

export const categoryRelations = relations(categoryTable, ({ many }) => ({
  products: many(productTable),
}));

export const productTable = pgTable("products", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categoryTable.id),
  imageUrl: text("image_url").notNull(),
});

export const productRelations = relations(productTable, ({ one, many }) => ({
  category: one(categoryTable, {
    fields: [productTable.categoryId],
    references: [categoryTable.id],
  }),
  groupOfAdditional: many(groupOfAdditionalTable),
  additional: many(additionalTable),
}));

export const groupOfAdditionalTable = pgTable("group_of_additional", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  min: integer().default(0),
  max: integer(),
  isRequired: boolean("is_required").notNull(),
  imageUrl: text("image_url").notNull(),
  productId: uuid("product_id")
    .notNull()
    .references(() => productTable.id),
});

export const groupOfAdditionalRelations = relations(
  groupOfAdditionalTable,
  ({ one, many }) => ({
    product: one(productTable, {
      fields: [groupOfAdditionalTable.productId],
      references: [productTable.id],
    }),
    additional: many(additionalTable),
  }),
);

export const additionalTable = pgTable("additionals", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  priceInCents: integer("price_in_cents").notNull(),
  groupOfAdditionalId: uuid("group_of_additional_id")
    .notNull()
    .references(() => groupOfAdditionalTable.id),
  productId: uuid("product_id")
    .notNull()
    .references(() => productTable.id),
  imageUrl: text("image_url").notNull(),
});

export const additionalRelations = relations(additionalTable, ({ one }) => ({
  groupOfAdditional: one(groupOfAdditionalTable, {
    fields: [additionalTable.groupOfAdditionalId],
    references: [groupOfAdditionalTable.id],
  }),
  product: one(productTable, {
    fields: [additionalTable.productId],
    references: [productTable.id],
  }),
}));

export const statusEnum = pgEnum("status_pedido", [
  "pendente",
  "em_andamento",
  "prontos_para_entrega",
  "saiu_para_entrega",
  "concluido",
  "cancelado",
]);

export const orderTable = pgTable("order", {
  id: uuid().primaryKey().defaultRandom(),
  status: statusEnum("status").default("pendente"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
});

export const orderRelations = relations(orderTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [orderTable.userId],
    references: [userTable.id],
  }),
  orderItems: many(orderItemsTable),
}));

export const orderItemsTable = pgTable("order_items", {
  id: uuid().primaryKey().defaultRandom(),
  quant: integer().notNull(),
  additionalId: uuid("additional_id")
    .notNull()
    .references(() => additionalTable.id),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orderTable.id),
});

export const orderItemsRelations = relations(
  orderItemsTable,
  ({ one }) => ({
    additional: one(additionalTable, {
      fields: [orderItemsTable.additionalId],
      references: [additionalTable.id],
    }),
    order: one(orderTable, {
      fields: [orderItemsTable.orderId],
      references: [orderTable.id],
    }),
  }),
);

export const sessionTable = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const accountTable = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verificationTable = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}));

export const accountRelations = relations(accountTable, ({ one }) => ({
  user: one(userTable, {
    fields: [accountTable.userId],
    references: [userTable.id],
  }),
}));
