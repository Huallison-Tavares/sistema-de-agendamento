import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    phoneNumber: integer("phone_number").notNull(),
    street: text(),
    houseNumber: text("house_number"),
    complement: text(),
    referencePoint: text("reference_point"),
    neighborhood: text(),
    city: text(),
    isAdm: boolean("is_adm").default(false)
});

export const userRelations = relations(userTable, ({ many }) => ({
    order: many(orderTable)
}));

export const categoryTable = pgTable("categorys", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull()
});

export const categoryRelations = relations(categoryTable, ({ many }) => ({
    products: many(productTable)
}))

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
    productId: uuid("product_id").notNull().references(() => productTable.id)
});

export const groupOfAdditionalRelations = relations(groupOfAdditionalTable, ({ one, many }) => ({
    product: one(productTable, {
        fields: [groupOfAdditionalTable.productId],
        references: [productTable.id]
    }),
    additional: many(additionalTable),
}));

export const additionalTable = pgTable("additionals", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    priceInCents: integer("price_in_cents").notNull(),
    groupOfAdditionalId: uuid("group_of_additional_id").notNull().references(() => groupOfAdditionalTable.id),
    productId: uuid("product_id").notNull().references(() => productTable.id),
    imageUrl: text("image_url").notNull(),
});

export const additionalRelations = relations(additionalTable, ({ one }) => ({
    groupOfAdditional: one(groupOfAdditionalTable, {
        fields: [additionalTable.groupOfAdditionalId],
        references: [groupOfAdditionalTable.id]
    }),
    product: one(productTable, {
        fields: [additionalTable.productId],
        references: [productTable.id]
    })
}));

export const statusEnum = pgEnum('status_pedido', ['pendente', 'em_andamento', 'prontos_para_entrega', 'saiu_para_entrega', 'concluido', 'cancelado']);

export const orderTable = pgTable("order", {
    id: uuid().primaryKey().defaultRandom(),
    status: statusEnum("status").default('pendente'),
    userId: uuid("user_id").notNull().references(() => userTable.id),
});

export const orderRelations = relations(orderTable, ({ one, many }) => ({
    user: one(userTable, {
        fields: [orderTable.userId],
        references: [userTable.id]
    }),
    orderItems: many(orderItemsTable)
}));

export const orderItemsTable = pgTable("order_items", {
    id: uuid().primaryKey().defaultRandom(),
    quant: integer().notNull(),
    additionalId: uuid("additional_id").notNull().references(() => additionalTable.id),
    orderId: uuid("order_id").notNull().references(() => orderTable.id)
});

export const orderItemsRelations = relations(orderItemsTable, ({ one, many }) => ({
    additional: one(additionalTable, {
        fields: [orderItemsTable.additionalId],
        references: [additionalTable.id]
    }),
    order: one(orderTable, {
        fields: [orderItemsTable.orderId],
        references: [orderTable.id]
    })
}));
