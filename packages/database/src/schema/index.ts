import {
  boolean,
  foreignKey,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

const timestamps = {
  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
};

export const accountStatusEnum = pgEnum('account_status', [
  'active',
  'suspended',
  'deleted',
]);

export const businessStatusEnum = pgEnum('business_status', [
  'configuring',
  'active',
  'suspended',
  'cancelled',
  'archived',
]);

export const membershipStatusEnum = pgEnum('membership_status', [
  'invited',
  'active',
  'suspended',
  'removed',
]);

export const moduleStatusEnum = pgEnum('module_status', [
  'active',
  'inactive',
]);

export const accounts = pgTable(
  'accounts',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    email: varchar('email', {
      length: 320,
    })
      .notNull(),

    status: accountStatusEnum('status')
      .default('active')
      .notNull(),

    ...timestamps,
  },
  (table) => ({
    emailUnique: uniqueIndex('accounts_email_unique').on(table.email),
  }),
);

export const businesses = pgTable(
  'businesses',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    name: varchar('name', {
      length: 200,
    }).notNull(),

    description: text('description'),

    status: businessStatusEnum('status')
      .default('configuring')
      .notNull(),

    timezone: varchar('timezone', {
      length: 100,
    })
      .default('UTC')
      .notNull(),

    currency: varchar('currency', {
      length: 3,
    })
      .default('USD')
      .notNull(),

    ...timestamps,
  },
);

export const businessSettings = pgTable(
  'business_settings',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    key: varchar('key', {
      length: 100,
    }).notNull(),

    value: text('value'),

    ...timestamps,
  },
  (table) => ({
    businessKeyUnique: uniqueIndex(
      'business_settings_business_key_unique',
    ).on(table.businessId, table.key),
  }),
);

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    accountId: uuid('account_id')
      .notNull()
      .references(() => accounts.id, {
        onDelete: 'cascade',
      }),

    firstName: varchar('first_name', {
      length: 100,
    }),

    lastName: varchar('last_name', {
      length: 100,
    }),

    ...timestamps,
  },
  (table) => ({
    accountUnique: uniqueIndex('users_account_unique').on(table.accountId),
  }),
);

export const roles = pgTable(
  'roles',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    name: varchar('name', {
      length: 100,
    }).notNull(),

    description: text('description'),

    ...timestamps,
  },
  (table) => ({
    businessNameUnique: uniqueIndex(
      'roles_business_name_unique',
    ).on(table.businessId, table.name),

    businessIdIdUnique: uniqueIndex(
      'roles_business_id_id_unique',
    ).on(table.businessId, table.id),
  }),
);

export const permissions = pgTable(
  'permissions',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    code: varchar('code', {
      length: 150,
    }).notNull(),

    description: text('description'),
  },
  (table) => ({
    codeUnique: uniqueIndex('permissions_code_unique').on(table.code),
  }),
);

export const rolePermissions = pgTable(
  'role_permissions',
  {
    roleId: uuid('role_id')
      .notNull()
      .references(() => roles.id, {
        onDelete: 'cascade',
      }),

    permissionId: uuid('permission_id')
      .notNull()
      .references(() => permissions.id, {
        onDelete: 'cascade',
      }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.roleId, table.permissionId],
    }),
  }),
);

export const businessMemberships = pgTable(
  'business_memberships',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),

    roleId: uuid('role_id')
      .notNull()
      .references(() => roles.id),

    status: membershipStatusEnum('status')
      .default('active')
      .notNull(),

    ...timestamps,
  },
  (table) => ({
    membershipUnique: uniqueIndex(
      'business_memberships_business_user_unique',
    ).on(table.businessId, table.userId),

    roleBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.roleId],
      foreignColumns: [roles.businessId, roles.id],
      name: 'business_memberships_business_role_fk',
    }),
  }),
);

export const modules = pgTable(
  'modules',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    code: varchar('code', {
      length: 100,
    }).notNull(),

    name: varchar('name', {
      length: 150,
    }).notNull(),

    description: text('description'),

    ...timestamps,
  },
  (table) => ({
    codeUnique: uniqueIndex('modules_code_unique').on(table.code),
  }),
);

export const businessModules = pgTable(
  'business_modules',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    moduleId: uuid('module_id')
      .notNull()
      .references(() => modules.id, {
        onDelete: 'cascade',
      }),

    status: moduleStatusEnum('status')
      .default('active')
      .notNull(),

    enabled: boolean('enabled')
      .default(true)
      .notNull(),

    ...timestamps,
  },
  (table) => ({
    businessModuleUnique: uniqueIndex(
      'business_modules_business_module_unique',
    ).on(table.businessId, table.moduleId),
  }),
);

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export type Business = typeof businesses.$inferSelect;
export type NewBusiness = typeof businesses.$inferInsert;

export type BusinessSetting = typeof businessSettings.$inferSelect;
export type NewBusinessSetting = typeof businessSettings.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;

export type Permission = typeof permissions.$inferSelect;
export type NewPermission = typeof permissions.$inferInsert;

export type BusinessMembership =
  typeof businessMemberships.$inferSelect;

export type NewBusinessMembership =
  typeof businessMemberships.$inferInsert;

export type Module = typeof modules.$inferSelect;
export type NewModule = typeof modules.$inferInsert;

export type BusinessModule =
  typeof businessModules.$inferSelect;

export type NewBusinessModule =
  typeof businessModules.$inferInsert;


// ============================================================
// CRM / CUSTOMERS
// ============================================================

export const customers = pgTable(
  'customers',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    firstName: varchar('first_name', {
      length: 100,
    }).notNull(),

    lastName: varchar('last_name', {
      length: 100,
    }),

    email: varchar('email', {
      length: 320,
    }),

    phone: varchar('phone', {
      length: 50,
    }),

    notes: text('notes'),

    ...timestamps,
  },
  (table) => ({
    businessEmailIndex: uniqueIndex(
      'customers_business_email_unique',
    ).on(table.businessId, table.email),

    businessIdIdUnique: uniqueIndex(
      'customers_business_id_id_unique',
    ).on(table.businessId, table.id),
  }),
);

export const customerTags = pgTable(
  'customer_tags',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    name: varchar('name', {
      length: 100,
    }).notNull(),

    ...timestamps,
  },
  (table) => ({
    businessNameUnique: uniqueIndex(
      'customer_tags_business_name_unique',
    ).on(table.businessId, table.name),
  }),
);

export const customerTagAssignments = pgTable(
  'customer_tag_assignments',
  {
    customerId: uuid('customer_id')
      .notNull()
      .references(() => customers.id, {
        onDelete: 'cascade',
      }),

    tagId: uuid('tag_id')
      .notNull()
      .references(() => customerTags.id, {
        onDelete: 'cascade',
      }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.customerId, table.tagId],
    }),
  }),
);


// ============================================================
// PRODUCTS / SERVICES
// ============================================================

export const productCategories = pgTable(
  'product_categories',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    name: varchar('name', {
      length: 150,
    }).notNull(),

    description: text('description'),

    ...timestamps,
  },
  (table) => ({
    businessNameUnique: uniqueIndex(
      'product_categories_business_name_unique',
    ).on(table.businessId, table.name),

    businessIdIdUnique: uniqueIndex(
      'product_categories_business_id_id_unique',
    ).on(table.businessId, table.id),
  }),
);

export const products = pgTable(
  'products',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    categoryId: uuid('category_id')
      .references(() => productCategories.id, {
        onDelete: 'set null',
      }),

    name: varchar('name', {
      length: 200,
    }).notNull(),

    description: text('description'),

    sku: varchar('sku', {
      length: 100,
    }),

    price: varchar('price', {
      length: 30,
    }),

    active: boolean('active')
      .default(true)
      .notNull(),

    ...timestamps,
  },
  (table) => ({
    businessSkuUnique: uniqueIndex(
      'products_business_sku_unique',
    ).on(table.businessId, table.sku),

    categoryBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.categoryId],
      foreignColumns: [productCategories.businessId, productCategories.id],
      name: 'products_business_category_fk',
    }),
  }),
);
export const services = pgTable(
  'services',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    categoryId: uuid('category_id')
      .references(() => productCategories.id, {
        onDelete: 'set null',
      }),

    name: varchar('name', {
      length: 200,
    }).notNull(),

    description: text('description'),

    durationMinutes: varchar('duration_minutes', {
      length: 10,
    }).notNull(),

    price: varchar('price', {
      length: 30,
    }).notNull(),

    active: boolean('active')
      .default(true)
      .notNull(),

    ...timestamps,
  },
  (table) => ({
    businessNameUnique: uniqueIndex(
      'services_business_name_unique',
    ).on(table.businessId, table.name),

    categoryBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.categoryId],
      foreignColumns: [productCategories.businessId, productCategories.id],
      name: 'services_business_category_fk',
    }),
  }),
);

// ============================================================
// AGENDA
// ============================================================

export const appointmentStatusEnum = pgEnum(
  'appointment_status',
  [
    'pending',
    'confirmed',
    'completed',
    'cancelled',
    'no_show',
  ],
);

export const appointments = pgTable(
  'appointments',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    customerId: uuid('customer_id')
      .notNull()
      .references(() => customers.id),

    assignedUserId: uuid('assigned_user_id')
      .references(() => users.id, {
        onDelete: 'set null',
      }),

    status: appointmentStatusEnum('status')
      .default('pending')
      .notNull(),

    startsAt: timestamp('starts_at', {
      withTimezone: true,
    }).notNull(),

    endsAt: timestamp('ends_at', {
      withTimezone: true,
    }).notNull(),

    notes: text('notes'),

    ...timestamps,
  },
  (table) => ({
    customerBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.customerId],
      foreignColumns: [customers.businessId, customers.id],
      name: 'appointments_business_customer_fk',
    }),
  }),
);

export const appointmentServices = pgTable(
  'appointment_services',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    appointmentId: uuid('appointment_id')
      .notNull()
      .references(() => appointments.id, {
        onDelete: 'cascade',
      }),

    serviceId: uuid('service_id')
      .notNull()
      .references(() => services.id),

    quantity: varchar('quantity', {
      length: 20,
    })
      .default('1')
      .notNull(),

    price: varchar('price', {
      length: 30,
    }).notNull(),
  },
);

export const staffAvailability = pgTable(
  'staff_availability',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),

    dayOfWeek: varchar('day_of_week', {
      length: 20,
    }).notNull(),

    startTime: varchar('start_time', {
      length: 10,
    }).notNull(),

    endTime: varchar('end_time', {
      length: 10,
    }).notNull(),

    active: boolean('active')
      .default(true)
      .notNull(),

    ...timestamps,
  },
);

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;

export type CustomerTag = typeof customerTags.$inferSelect;
export type NewCustomerTag = typeof customerTags.$inferInsert;

export type ProductCategory =
  typeof productCategories.$inferSelect;

export type NewProductCategory =
  typeof productCategories.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;

export type Appointment =
  typeof appointments.$inferSelect;

export type NewAppointment =
  typeof appointments.$inferInsert;

export type AppointmentService =
  typeof appointmentServices.$inferSelect;

export type NewAppointmentService =
  typeof appointmentServices.$inferInsert;

export type StaffAvailability =
  typeof staffAvailability.$inferSelect;

export type NewStaffAvailability =
  typeof staffAvailability.$inferInsert;


// ============================================================
// SALES
// ============================================================

export const saleStatusEnum = pgEnum('sale_status', [
  'draft',
  'confirmed',
  'cancelled',
  'refunded',
]);

export const sales = pgTable(
  'sales',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    customerId: uuid('customer_id')
      .references(() => customers.id, {
        onDelete: 'set null',
      }),

    createdByUserId: uuid('created_by_user_id')
      .references(() => users.id, {
        onDelete: 'set null',
      }),

    status: saleStatusEnum('status')
      .default('draft')
      .notNull(),

    subtotal: varchar('subtotal', {
      length: 30,
    })
      .default('0')
      .notNull(),

    discount: varchar('discount', {
      length: 30,
    })
      .default('0')
      .notNull(),

    tax: varchar('tax', {
      length: 30,
    })
      .default('0')
      .notNull(),

    total: varchar('total', {
      length: 30,
    })
      .default('0')
      .notNull(),

    currency: varchar('currency', {
      length: 3,
    })
      .default('USD')
      .notNull(),

    ...timestamps,
  },
  (table) => ({
    customerBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.customerId],
      foreignColumns: [customers.businessId, customers.id],
      name: 'sales_business_customer_fk',
    }),

    businessIdIdUnique: uniqueIndex(
      'sales_business_id_id_unique',
    ).on(table.businessId, table.id),
  }),
);

export const saleItems = pgTable(
  'sale_items',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    saleId: uuid('sale_id')
      .notNull()
      .references(() => sales.id, {
        onDelete: 'cascade',
      }),

    productId: uuid('product_id')
      .references(() => products.id, {
        onDelete: 'set null',
      }),

    serviceId: uuid('service_id')
      .references(() => services.id, {
        onDelete: 'set null',
      }),

    description: varchar('description', {
      length: 300,
    }).notNull(),

    quantity: varchar('quantity', {
      length: 20,
    })
      .default('1')
      .notNull(),

    unitPrice: varchar('unit_price', {
      length: 30,
    }).notNull(),

    total: varchar('total', {
      length: 30,
    }).notNull(),
  },
);

export const paymentStatusEnum = pgEnum(
  'payment_status',
  [
    'pending',
    'completed',
    'failed',
    'refunded',
  ],
);

export const paymentMethods = pgTable(
  'payment_methods',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    name: varchar('name', {
      length: 100,
    }).notNull(),

    code: varchar('code', {
      length: 50,
    }).notNull(),

    active: boolean('active')
      .default(true)
      .notNull(),

    ...timestamps,
  },
  (table) => ({
    businessCodeUnique: uniqueIndex(
      'payment_methods_business_code_unique',
    ).on(table.businessId, table.code),

    businessIdIdUnique: uniqueIndex(
      'payment_methods_business_id_id_unique',
    ).on(table.businessId, table.id),
  }),
);

export const payments = pgTable(
  'payments',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    saleId: uuid('sale_id')
      .notNull()
      .references(() => sales.id, {
        onDelete: 'cascade',
      }),

    paymentMethodId: uuid('payment_method_id')
      .references(() => paymentMethods.id, {
        onDelete: 'set null',
      }),

    status: paymentStatusEnum('status')
      .default('pending')
      .notNull(),

    amount: varchar('amount', {
      length: 30,
    }).notNull(),

    currency: varchar('currency', {
      length: 3,
    })
      .default('USD')
      .notNull(),

    paidAt: timestamp('paid_at', {
      withTimezone: true,
    }),

    ...timestamps,
  },
  (table) => ({
    saleBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.saleId],
      foreignColumns: [sales.businessId, sales.id],
      name: 'payments_business_sale_fk',
    }),

    paymentMethodBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.paymentMethodId],
      foreignColumns: [paymentMethods.businessId, paymentMethods.id],
      name: 'payments_business_payment_method_fk',
    }),
  }),
);


// ============================================================
// FINANCE
// ============================================================

export const financialTransactionTypeEnum = pgEnum(
  'financial_transaction_type',
  [
    'income',
    'expense',
    'transfer',
    'adjustment',
  ],
);

export const financeAccounts = pgTable(
  'finance_accounts',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    name: varchar('name', {
      length: 150,
    }).notNull(),

    type: varchar('type', {
      length: 50,
    }).notNull(),

    currency: varchar('currency', {
      length: 3,
    })
      .default('USD')
      .notNull(),

    active: boolean('active')
      .default(true)
      .notNull(),

    ...timestamps,
  },
  (table) => ({
    businessIdIdUnique: uniqueIndex(
      'finance_accounts_business_id_id_unique',
    ).on(table.businessId, table.id),
  }),
);

export const financialCategories = pgTable(
  'financial_categories',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    name: varchar('name', {
      length: 150,
    }).notNull(),

    type: financialTransactionTypeEnum('type')
      .notNull(),

    ...timestamps,
  },
  (table) => ({
    businessNameUnique: uniqueIndex(
      'financial_categories_business_name_unique',
    ).on(table.businessId, table.name),

    businessIdIdUnique: uniqueIndex(
      'financial_categories_business_id_id_unique',
    ).on(table.businessId, table.id),
  }),
);

export const financialTransactions = pgTable(
  'financial_transactions',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    accountId: uuid('account_id')
      .notNull()
      .references(() => financeAccounts.id),

    categoryId: uuid('category_id')
      .references(() => financialCategories.id, {
        onDelete: 'set null',
      }),

    saleId: uuid('sale_id')
      .references(() => sales.id, {
        onDelete: 'set null',
      }),

    type: financialTransactionTypeEnum('type')
      .notNull(),

    description: varchar('description', {
      length: 300,
    }).notNull(),

    amount: varchar('amount', {
      length: 30,
    }).notNull(),

    currency: varchar('currency', {
      length: 3,
    })
      .default('USD')
      .notNull(),

    occurredAt: timestamp('occurred_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    ...timestamps,
  },
  (table) => ({
    accountBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.accountId],
      foreignColumns: [financeAccounts.businessId, financeAccounts.id],
      name: 'financial_transactions_business_account_fk',
    }),

    categoryBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.categoryId],
      foreignColumns: [financialCategories.businessId, financialCategories.id],
      name: 'financial_transactions_business_category_fk',
    }),

    saleBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.saleId],
      foreignColumns: [sales.businessId, sales.id],
      name: 'financial_transactions_business_sale_fk',
    }),
  }),
);

export type Sale = typeof sales.$inferSelect;
export type NewSale = typeof sales.$inferInsert;

export type SaleItem = typeof saleItems.$inferSelect;
export type NewSaleItem = typeof saleItems.$inferInsert;

export type PaymentMethod =
  typeof paymentMethods.$inferSelect;

export type NewPaymentMethod =
  typeof paymentMethods.$inferInsert;

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;

export type FinanceAccount =
  typeof financeAccounts.$inferSelect;

export type NewFinanceAccount =
  typeof financeAccounts.$inferInsert;

export type FinancialCategory =
  typeof financialCategories.$inferSelect;

export type NewFinancialCategory =
  typeof financialCategories.$inferInsert;

export type FinancialTransaction =
  typeof financialTransactions.$inferSelect;

export type NewFinancialTransaction =
  typeof financialTransactions.$inferInsert;


// ============================================================
// INVENTORY
// ============================================================

export const inventory = pgTable(
  'inventory',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, {
        onDelete: 'cascade',
      }),

    quantity: varchar('quantity', {
      length: 30,
    })
      .default('0')
      .notNull(),

    minimumQuantity: varchar('minimum_quantity', {
      length: 30,
    })
      .default('0')
      .notNull(),

    location: varchar('location', {
      length: 150,
    }),

    ...timestamps,
  },
  (table) => ({
    businessProductUnique: uniqueIndex(
      'inventory_business_product_unique',
    ).on(table.businessId, table.productId),

    productBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.productId],
      foreignColumns: [products.businessId, products.id],
      name: 'inventory_business_product_fk',
    }),
  }),
);

export const inventoryMovementTypeEnum = pgEnum(
  'inventory_movement_type',
  [
    'purchase',
    'sale',
    'adjustment',
    'return',
    'loss',
    'transfer',
  ],
);

export const inventoryMovements = pgTable(
  'inventory_movements',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    productId: uuid('product_id')
      .notNull()
      .references(() => products.id),

    type: inventoryMovementTypeEnum('type')
      .notNull(),

    quantity: varchar('quantity', {
      length: 30,
    }).notNull(),

    referenceType: varchar('reference_type', {
      length: 50,
    }),

    referenceId: uuid('reference_id'),

    notes: text('notes'),

    occurredAt: timestamp('occurred_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    ...timestamps,
  },
  (table) => ({
    productBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.productId],
      foreignColumns: [products.businessId, products.id],
      name: 'inventory_movements_business_product_fk',
    }),
  }),
);

export const suppliers = pgTable(
  'suppliers',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    name: varchar('name', {
      length: 200,
    }).notNull(),

    email: varchar('email', {
      length: 320,
    }),

    phone: varchar('phone', {
      length: 50,
    }),

    notes: text('notes'),

    ...timestamps,
  },
  (table) => ({
    businessIdIdUnique: uniqueIndex(
      'suppliers_business_id_id_unique',
    ).on(table.businessId, table.id),
  }),
);

export const purchaseStatusEnum = pgEnum(
  'purchase_status',
  [
    'draft',
    'ordered',
    'received',
    'cancelled',
  ],
);

export const purchases = pgTable(
  'purchases',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    supplierId: uuid('supplier_id')
      .references(() => suppliers.id, {
        onDelete: 'set null',
      }),

    status: purchaseStatusEnum('status')
      .default('draft')
      .notNull(),

    subtotal: varchar('subtotal', {
      length: 30,
    })
      .default('0')
      .notNull(),

    total: varchar('total', {
      length: 30,
    })
      .default('0')
      .notNull(),

    currency: varchar('currency', {
      length: 3,
    })
      .default('USD')
      .notNull(),

    orderedAt: timestamp('ordered_at', {
      withTimezone: true,
    }),

    receivedAt: timestamp('received_at', {
      withTimezone: true,
    }),

    ...timestamps,
  },
  (table) => ({
    supplierBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.supplierId],
      foreignColumns: [suppliers.businessId, suppliers.id],
      name: 'purchases_business_supplier_fk',
    }),
  }),
);

export const purchaseItems = pgTable(
  'purchase_items',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    purchaseId: uuid('purchase_id')
      .notNull()
      .references(() => purchases.id, {
        onDelete: 'cascade',
      }),

    productId: uuid('product_id')
      .notNull()
      .references(() => products.id),

    quantity: varchar('quantity', {
      length: 30,
    }).notNull(),

    unitCost: varchar('unit_cost', {
      length: 30,
    }).notNull(),

    total: varchar('total', {
      length: 30,
    }).notNull(),
  },
);

export type Inventory = typeof inventory.$inferSelect;
export type NewInventory = typeof inventory.$inferInsert;

export type InventoryMovement =
  typeof inventoryMovements.$inferSelect;

export type NewInventoryMovement =
  typeof inventoryMovements.$inferInsert;

export type Supplier = typeof suppliers.$inferSelect;
export type NewSupplier = typeof suppliers.$inferInsert;

export type Purchase = typeof purchases.$inferSelect;
export type NewPurchase = typeof purchases.$inferInsert;

export type PurchaseItem =
  typeof purchaseItems.$inferSelect;

export type NewPurchaseItem =
  typeof purchaseItems.$inferInsert;


// ============================================================
// MARKETING / CONTENT
// ============================================================

export const contentStatusEnum = pgEnum(
  'content_status',
  [
    'draft',
    'ready',
    'scheduled',
    'published',
    'archived',
  ],
);

export const content = pgTable(
  'content',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    createdByUserId: uuid('created_by_user_id')
      .references(() => users.id, {
        onDelete: 'set null',
      }),

    title: varchar('title', {
      length: 300,
    }).notNull(),

    type: varchar('type', {
      length: 50,
    }).notNull(),

    status: contentStatusEnum('status')
      .default('draft')
      .notNull(),

    description: text('description'),

    ...timestamps,
  },
  (table) => ({
    businessIdIdUnique: uniqueIndex(
      'content_business_id_id_unique',
    ).on(table.businessId, table.id),
  }),
);

export const contentVersions = pgTable(
  'content_versions',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    contentId: uuid('content_id')
      .notNull()
      .references(() => content.id, {
        onDelete: 'cascade',
      }),

    version: varchar('version', {
      length: 20,
    }).notNull(),

    body: text('body'),

    metadata: text('metadata'),

    createdByUserId: uuid('created_by_user_id')
      .references(() => users.id, {
        onDelete: 'set null',
      }),

    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
);

export const publicationStatusEnum = pgEnum(
  'publication_status',
  [
    'draft',
    'scheduled',
    'publishing',
    'published',
    'failed',
    'cancelled',
  ],
);

export const publications = pgTable(
  'publications',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    contentId: uuid('content_id')
      .notNull()
      .references(() => content.id, {
        onDelete: 'cascade',
      }),

    channel: varchar('channel', {
      length: 50,
    }).notNull(),

    status: publicationStatusEnum('status')
      .default('draft')
      .notNull(),

    scheduledAt: timestamp('scheduled_at', {
      withTimezone: true,
    }),

    publishedAt: timestamp('published_at', {
      withTimezone: true,
    }),

    externalId: varchar('external_id', {
      length: 300,
    }),

    errorMessage: text('error_message'),

    ...timestamps,
  },
  (table) => ({
    contentBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.contentId],
      foreignColumns: [content.businessId, content.id],
      name: 'publications_business_content_fk',
    }),
  }),
);


// ============================================================
// CAMPAIGNS
// ============================================================

export const campaignStatusEnum = pgEnum(
  'campaign_status',
  [
    'draft',
    'scheduled',
    'active',
    'paused',
    'completed',
    'cancelled',
  ],
);

export const campaigns = pgTable(
  'campaigns',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    createdByUserId: uuid('created_by_user_id')
      .references(() => users.id, {
        onDelete: 'set null',
      }),

    name: varchar('name', {
      length: 200,
    }).notNull(),

    objective: text('objective'),

    status: campaignStatusEnum('status')
      .default('draft')
      .notNull(),

    budget: varchar('budget', {
      length: 30,
    }),

    currency: varchar('currency', {
      length: 3,
    })
      .default('USD')
      .notNull(),

    startsAt: timestamp('starts_at', {
      withTimezone: true,
    }),

    endsAt: timestamp('ends_at', {
      withTimezone: true,
    }),

    ...timestamps,
  },
);

export const campaignAudiences = pgTable(
  'campaign_audiences',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    campaignId: uuid('campaign_id')
      .notNull()
      .references(() => campaigns.id, {
        onDelete: 'cascade',
      }),

    name: varchar('name', {
      length: 150,
    }).notNull(),

    definition: text('definition'),

    ...timestamps,
  },
);

export const campaignMetrics = pgTable(
  'campaign_metrics',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    campaignId: uuid('campaign_id')
      .notNull()
      .references(() => campaigns.id, {
        onDelete: 'cascade',
      }),

    channel: varchar('channel', {
      length: 50,
    }).notNull(),

    impressions: varchar('impressions', {
      length: 30,
    })
      .default('0')
      .notNull(),

    clicks: varchar('clicks', {
      length: 30,
    })
      .default('0')
      .notNull(),

    conversions: varchar('conversions', {
      length: 30,
    })
      .default('0')
      .notNull(),

    spend: varchar('spend', {
      length: 30,
    })
      .default('0')
      .notNull(),

    revenue: varchar('revenue', {
      length: 30,
    })
      .default('0')
      .notNull(),

    recordedAt: timestamp('recorded_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    ...timestamps,
  },
);


// ============================================================
// MARKETING TYPES
// ============================================================

export type Content = typeof content.$inferSelect;
export type NewContent = typeof content.$inferInsert;

export type ContentVersion =
  typeof contentVersions.$inferSelect;

export type NewContentVersion =
  typeof contentVersions.$inferInsert;

export type Publication =
  typeof publications.$inferSelect;

export type NewPublication =
  typeof publications.$inferInsert;

export type Campaign =
  typeof campaigns.$inferSelect;

export type NewCampaign =
  typeof campaigns.$inferInsert;

export type CampaignAudience =
  typeof campaignAudiences.$inferSelect;

export type NewCampaignAudience =
  typeof campaignAudiences.$inferInsert;

export type CampaignMetric =
  typeof campaignMetrics.$inferSelect;

export type NewCampaignMetric =
  typeof campaignMetrics.$inferInsert;


// ============================================================
// COMMUNICATIONS
// ============================================================

export const communicationChannelEnum = pgEnum(
  'communication_channel',
  [
    'whatsapp',
    'instagram',
    'facebook',
    'email',
    'sms',
    'web',
    'other',
  ],
);

export const conversationStatusEnum = pgEnum(
  'conversation_status',
  [
    'open',
    'pending',
    'resolved',
    'archived',
  ],
);

export const messageDirectionEnum = pgEnum(
  'message_direction',
  [
    'inbound',
    'outbound',
  ],
);

export const messageSenderTypeEnum = pgEnum(
  'message_sender_type',
  [
    'customer',
    'user',
    'ai',
    'system',
  ],
);

export const messageStatusEnum = pgEnum(
  'message_status',
  [
    'pending',
    'sent',
    'delivered',
    'read',
    'failed',
  ],
);


// ============================================================
// EXTERNAL IDENTITIES
// ============================================================

export const externalIdentities = pgTable(
  'external_identities',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    customerId: uuid('customer_id')
      .references(() => customers.id, {
        onDelete: 'set null',
      }),

    channel: communicationChannelEnum('channel')
      .notNull(),

    externalId: varchar('external_id', {
      length: 300,
    }).notNull(),

    displayName: varchar('display_name', {
      length: 200,
    }),

    metadata: text('metadata'),

    ...timestamps,
  },
  (table) => ({
    customerBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.customerId],
      foreignColumns: [customers.businessId, customers.id],
      name: 'external_identities_business_customer_fk',
    }),
  }),
);


// ============================================================
// CONVERSATIONS
// ============================================================

export const conversations = pgTable(
  'conversations',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    customerId: uuid('customer_id')
      .references(() => customers.id, {
        onDelete: 'set null',
      }),

    channel: communicationChannelEnum('channel')
      .notNull(),

    externalConversationId: varchar(
      'external_conversation_id',
      {
        length: 300,
      },
    ),

    status: conversationStatusEnum('status')
      .default('open')
      .notNull(),

    lastMessageAt: timestamp('last_message_at', {
      withTimezone: true,
    }),

    ...timestamps,
  },
  (table) => ({
    customerBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.customerId],
      foreignColumns: [customers.businessId, customers.id],
      name: 'conversations_business_customer_fk',
    }),
    businessIdIdUnique: uniqueIndex(
      'conversations_business_id_id_unique',
    ).on(table.businessId, table.id),
  }),
);


// ============================================================
// MESSAGES
// ============================================================

export const messages = pgTable(
  'messages',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    conversationId: uuid('conversation_id')
      .notNull()
      .references(() => conversations.id, {
        onDelete: 'cascade',
      }),

    direction: messageDirectionEnum('direction')
      .notNull(),

    senderType: messageSenderTypeEnum('sender_type')
      .notNull(),

    senderUserId: uuid('sender_user_id')
      .references(() => users.id, {
        onDelete: 'set null',
      }),

    body: text('body'),

    externalMessageId: varchar(
      'external_message_id',
      {
        length: 300,
      },
    ),

    status: messageStatusEnum('status')
      .default('pending')
      .notNull(),

    sentAt: timestamp('sent_at', {
      withTimezone: true,
    }),

    metadata: text('metadata'),

    ...timestamps,
  },
  (table) => ({
    conversationBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.conversationId],
      foreignColumns: [conversations.businessId, conversations.id],
      name: 'messages_business_conversation_fk',
    }),
  }),
);


// ============================================================
// COMMUNICATION TYPES
// ============================================================

export type ExternalIdentity =
  typeof externalIdentities.$inferSelect;

export type NewExternalIdentity =
  typeof externalIdentities.$inferInsert;

export type Conversation =
  typeof conversations.$inferSelect;

export type NewConversation =
  typeof conversations.$inferInsert;

export type Message =
  typeof messages.$inferSelect;

export type NewMessage =
  typeof messages.$inferInsert;


// ============================================================
// BUSINESS BRAIN
// ============================================================

export const businessBrainEntries = pgTable(
  'business_brain_entries',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    category: varchar('category', {
      length: 100,
    }).notNull(),

    key: varchar('key', {
      length: 200,
    }).notNull(),

    value: text('value'),

    source: varchar('source', {
      length: 100,
    }),

    confidence: varchar('confidence', {
      length: 20,
    }),

    active: boolean('active')
      .default(true)
      .notNull(),

    ...timestamps,
  },
);


// ============================================================
// AI MEMORY
// ============================================================

export const aiMemoryTypeEnum = pgEnum(
  'ai_memory_type',
  [
    'session',
    'conversation',
    'business',
    'decision',
    'learning',
  ],
);

export const aiMemories = pgTable(
  'ai_memories',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    userId: uuid('user_id')
      .references(() => users.id, {
        onDelete: 'set null',
      }),

    type: aiMemoryTypeEnum('type')
      .notNull(),

    key: varchar('key', {
      length: 200,
    }),

    content: text('content'),

    importance: varchar('importance', {
      length: 20,
    }),

    expiresAt: timestamp('expires_at', {
      withTimezone: true,
    }),

    ...timestamps,
  },
);


// ============================================================
// AI REQUESTS / EXECUTIONS
// ============================================================

export const aiExecutionStatusEnum = pgEnum(
  'ai_execution_status',
  [
    'pending',
    'running',
    'completed',
    'failed',
    'cancelled',
  ],
);

export const aiAutonomyLevelEnum = pgEnum(
  'ai_autonomy_level',
  [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
  ],
);

export const aiExecutions = pgTable(
  'ai_executions',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    userId: uuid('user_id')
      .references(() => users.id, {
        onDelete: 'set null',
      }),

    agent: varchar('agent', {
      length: 100,
    }).notNull(),

    task: varchar('task', {
      length: 200,
    }).notNull(),

    status: aiExecutionStatusEnum('status')
      .default('pending')
      .notNull(),

    autonomyLevel: aiAutonomyLevelEnum(
      'autonomy_level',
    )
      .default('1')
      .notNull(),

    provider: varchar('provider', {
      length: 100,
    }),

    model: varchar('model', {
      length: 200,
    }),

    input: text('input'),

    output: text('output'),

    errorMessage: text('error_message'),

    startedAt: timestamp('started_at', {
      withTimezone: true,
    }),

    completedAt: timestamp('completed_at', {
      withTimezone: true,
    }),

    ...timestamps,
  },
  (table) => ({
    businessIdIdUnique: uniqueIndex(
      'ai_executions_business_id_id_unique',
    ).on(table.businessId, table.id),
  }),
);


// ============================================================
// AI COSTS
// ============================================================

export const aiExecutionCosts = pgTable(
  'ai_execution_costs',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    executionId: uuid('execution_id')
      .notNull()
      .references(() => aiExecutions.id, {
        onDelete: 'cascade',
      }),

    provider: varchar('provider', {
      length: 100,
    }).notNull(),

    model: varchar('model', {
      length: 200,
    }).notNull(),

    inputTokens: varchar('input_tokens', {
      length: 30,
    })
      .default('0')
      .notNull(),

    outputTokens: varchar('output_tokens', {
      length: 30,
    })
      .default('0')
      .notNull(),

    totalTokens: varchar('total_tokens', {
      length: 30,
    })
      .default('0')
      .notNull(),

    estimatedCost: varchar('estimated_cost', {
      length: 30,
    })
      .default('0')
      .notNull(),

    currency: varchar('currency', {
      length: 3,
    })
      .default('USD')
      .notNull(),

    ...timestamps,
  },
);


// ============================================================
// AI APPROVALS
// ============================================================

export const aiApprovalStatusEnum = pgEnum(
  'ai_approval_status',
  [
    'pending',
    'approved',
    'rejected',
    'expired',
    'cancelled',
  ],
);

export const aiApprovals = pgTable(
  'ai_approvals',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    executionId: uuid('execution_id')
      .notNull()
      .references(() => aiExecutions.id, {
        onDelete: 'cascade',
      }),

    requestedByUserId: uuid('requested_by_user_id')
      .references(() => users.id, {
        onDelete: 'set null',
      }),

    reviewedByUserId: uuid('reviewed_by_user_id')
      .references(() => users.id, {
        onDelete: 'set null',
      }),

    status: aiApprovalStatusEnum('status')
      .default('pending')
      .notNull(),

    reason: text('reason'),

    reviewedAt: timestamp('reviewed_at', {
      withTimezone: true,
    }),

    expiresAt: timestamp('expires_at', {
      withTimezone: true,
    }),

    ...timestamps,
  },
  (table) => ({
    executionBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.executionId],
      foreignColumns: [aiExecutions.businessId, aiExecutions.id],
      name: 'ai_approvals_business_execution_fk',
    }),
  }),
);


// ============================================================
// AI TYPES
// ============================================================

export type BusinessBrainEntry =
  typeof businessBrainEntries.$inferSelect;

export type NewBusinessBrainEntry =
  typeof businessBrainEntries.$inferInsert;

export type AIMemory =
  typeof aiMemories.$inferSelect;

export type NewAIMemory =
  typeof aiMemories.$inferInsert;

export type AIExecution =
  typeof aiExecutions.$inferSelect;

export type NewAIExecution =
  typeof aiExecutions.$inferInsert;

export type AIExecutionCost =
  typeof aiExecutionCosts.$inferSelect;

export type NewAIExecutionCost =
  typeof aiExecutionCosts.$inferInsert;

export type AIApproval =
  typeof aiApprovals.$inferSelect;

export type NewAIApproval =
  typeof aiApprovals.$inferInsert;


// ============================================================
// AUTOMATIONS
// ============================================================

export const automationStatusEnum = pgEnum(
  'automation_status',
  [
    'draft',
    'active',
    'paused',
    'archived',
  ],
);

export const automations = pgTable(
  'automations',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    createdByUserId: uuid('created_by_user_id')
      .references(() => users.id, {
        onDelete: 'set null',
      }),

    name: varchar('name', {
      length: 200,
    }).notNull(),

    description: text('description'),

    status: automationStatusEnum('status')
      .default('draft')
      .notNull(),

    triggerType: varchar('trigger_type', {
      length: 100,
    }).notNull(),

    triggerConfig: text('trigger_config'),

    actionConfig: text('action_config'),

    ...timestamps,
  },
  (table) => ({
    businessIdIdUnique: uniqueIndex(
      'automations_business_id_id_unique',
    ).on(table.businessId, table.id),
  }),
);


// ============================================================
// AUTOMATION EXECUTIONS
// ============================================================

export const automationExecutionStatusEnum = pgEnum(
  'automation_execution_status',
  [
    'pending',
    'running',
    'completed',
    'failed',
    'cancelled',
  ],
);

export const automationExecutions = pgTable(
  'automation_executions',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    automationId: uuid('automation_id')
      .notNull()
      .references(() => automations.id, {
        onDelete: 'cascade',
      }),

    status: automationExecutionStatusEnum(
      'status',
    )
      .default('pending')
      .notNull(),

    input: text('input'),

    output: text('output'),

    errorMessage: text('error_message'),

    startedAt: timestamp('started_at', {
      withTimezone: true,
    }),

    completedAt: timestamp('completed_at', {
      withTimezone: true,
    }),

    ...timestamps,
  },
  (table) => ({
    automationBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.automationId],
      foreignColumns: [automations.businessId, automations.id],
      name: 'automation_executions_business_automation_fk',
    }),
  }),
);


// ============================================================
// DOMAIN EVENTS
// ============================================================

export const domainEvents = pgTable(
  'domain_events',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    eventType: varchar('event_type', {
      length: 150,
    }).notNull(),

    aggregateType: varchar('aggregate_type', {
      length: 100,
    }).notNull(),

    aggregateId: uuid('aggregate_id'),

    payload: text('payload'),

    occurredAt: timestamp('occurred_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    ...timestamps,
  },
);


// ============================================================
// OUTBOX
// ============================================================

export const outboxStatusEnum = pgEnum(
  'outbox_status',
  [
    'pending',
    'processing',
    'published',
    'failed',
  ],
);

export const outboxEvents = pgTable(
  'outbox_events',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    eventType: varchar('event_type', {
      length: 150,
    }).notNull(),

    payload: text('payload'),

    status: outboxStatusEnum('status')
      .default('pending')
      .notNull(),

    attempts: varchar('attempts', {
      length: 20,
    })
      .default('0')
      .notNull(),

    availableAt: timestamp('available_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    processedAt: timestamp('processed_at', {
      withTimezone: true,
    }),

    lastError: text('last_error'),

    ...timestamps,
  },
);


// ============================================================
// AUDIT LOG
// ============================================================

export const auditLogs = pgTable(
  'audit_logs',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    userId: uuid('user_id')
     .references(() => users.id, {
        onDelete: 'set null',
      }),

    action: varchar('action', {
      length: 150,
    }).notNull(),

    entityType: varchar('entity_type', {
      length: 100,
    }),

    entityId: uuid('entity_id'),

    beforeData: text('before_data'),

    afterData: text('after_data'),

    metadata: text('metadata'),

    ipAddress: varchar('ip_address', {
      length: 100,
    }),

    userAgent: text('user_agent'),

    occurredAt: timestamp('occurred_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    ...timestamps,
  },
);


// ============================================================
// AUTOMATION / EVENT TYPES
// ============================================================

export type Automation =
  typeof automations.$inferSelect;

export type NewAutomation =
  typeof automations.$inferInsert;

export type AutomationExecution =
  typeof automationExecutions.$inferSelect;

export type NewAutomationExecution =
  typeof automationExecutions.$inferInsert;

export type DomainEvent =
  typeof domainEvents.$inferSelect;

export type NewDomainEvent =
  typeof domainEvents.$inferInsert;

export type OutboxEvent =
  typeof outboxEvents.$inferSelect;

export type NewOutboxEvent =
  typeof outboxEvents.$inferInsert;

export type AuditLog =
  typeof auditLogs.$inferSelect;

export type NewAuditLog =
  typeof auditLogs.$inferInsert;


// ============================================================
// INTEGRATIONS
// ============================================================

export const integrationStatusEnum = pgEnum(
  'integration_status',
  [
    'active',
    'inactive',
    'error',
    'revoked',
  ],
);

export const integrationTypeEnum = pgEnum(
  'integration_type',
  [
    'communication',
    'payment',
    'calendar',
    'storage',
    'ai',
    'analytics',
    'social',
    'other',
  ],
);

export const integrations = pgTable(
  'integrations',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    type: integrationTypeEnum('type')
      .notNull(),

    provider: varchar('provider', {
      length: 100,
    }).notNull(),

    name: varchar('name', {
      length: 200,
    }).notNull(),

    status: integrationStatusEnum('status')
      .default('inactive')
      .notNull(),

    externalAccountId: varchar(
      'external_account_id',
      {
        length: 300,
      },
    ),

    configuration: text('configuration'),

    lastError: text('last_error'),

    lastSyncedAt: timestamp('last_synced_at', {
      withTimezone: true,
    }),

    ...timestamps,
  },
);


// ============================================================
// INTEGRATION CONNECTIONS
// ============================================================

export const integrationConnections = pgTable(
  'integration_connections',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    integrationId: uuid('integration_id')
      .notNull()
      .references(() => integrations.id, {
        onDelete: 'cascade',
      }),

    connectionType: varchar(
      'connection_type',
      {
        length: 100,
      },
    ).notNull(),

    externalId: varchar('external_id', {
      length: 300,
    }),

    status: integrationStatusEnum('status')
      .default('active')
      .notNull(),

    metadata: text('metadata'),

    ...timestamps,
  },
);


// ============================================================
// INTEGRATION WEBHOOKS
// ============================================================

export const integrationWebhookStatusEnum = pgEnum(
  'integration_webhook_status',
  [
    'received',
    'processing',
    'processed',
    'failed',
    'ignored',
  ],
);

export const integrationWebhooks = pgTable(
  'integration_webhooks',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    integrationId: uuid('integration_id')
      .references(() => integrations.id, {
        onDelete: 'cascade',
      }),

    eventType: varchar('event_type', {
      length: 150,
    }).notNull(),

    externalEventId: varchar(
      'external_event_id',
      {
        length: 300,
      },
    ),

    status: integrationWebhookStatusEnum(
      'status',
    )
      .default('received')
      .notNull(),

    payload: text('payload'),

    signatureVerified: boolean(
      'signature_verified',
    )
      .default(false)
      .notNull(),

    attempts: varchar('attempts', {
      length: 20,
    })
      .default('0')
      .notNull(),

    receivedAt: timestamp('received_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    processedAt: timestamp('processed_at', {
      withTimezone: true,
    }),

    errorMessage: text('error_message'),

    ...timestamps,
  },
);


// ============================================================
// INTEGRATION TYPES
// ============================================================

export type Integration =
  typeof integrations.$inferSelect;

export type NewIntegration =
  typeof integrations.$inferInsert;

export type IntegrationConnection =
  typeof integrationConnections.$inferSelect;

export type NewIntegrationConnection =
  typeof integrationConnections.$inferInsert;

export type IntegrationWebhook =
  typeof integrationWebhooks.$inferSelect;

export type NewIntegrationWebhook =
  typeof integrationWebhooks.$inferInsert;


// ============================================================
// FILES / DOCUMENTS
// ============================================================

export const fileStatusEnum = pgEnum(
  'file_status',
  [
    'active',
    'processing',
    'processed',
    'failed',
    'deleted',
  ],
);

export const files = pgTable(
  'files',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    uploadedByUserId: uuid('uploaded_by_user_id')
      .references(() => users.id, {
        onDelete: 'set null',
      }),

    name: varchar('name', {
      length: 300,
    }).notNull(),

    originalName: varchar('original_name', {
      length: 300,
    }),

    mimeType: varchar('mime_type', {
      length: 150,
    }).notNull(),

    storageProvider: varchar('storage_provider', {
      length: 100,
    }).notNull(),

    storageKey: varchar('storage_key', {
      length: 500,
    }).notNull(),

    sizeBytes: varchar('size_bytes', {
      length: 30,
    }),

    status: fileStatusEnum('status')
      .default('active')
      .notNull(),

    ...timestamps,
  },
  (table) => ({
    businessIdIdUnique: uniqueIndex(
      'files_business_id_id_unique',
    ).on(table.businessId, table.id),
  }),
);


// ============================================================
// DOCUMENTS
// ============================================================

export const documentStatusEnum = pgEnum(
  'document_status',
  [
    'pending',
    'processing',
    'ready',
    'failed',
    'archived',
  ],
);

export const documents = pgTable(
  'documents',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    fileId: uuid('file_id')
      .references(() => files.id, {
        onDelete: 'set null',
      }),

    title: varchar('title', {
      length: 300,
    }).notNull(),

    documentType: varchar('document_type', {
      length: 100,
    }),

    status: documentStatusEnum('status')
      .default('pending')
      .notNull(),

    extractedText: text('extracted_text'),

    metadata: text('metadata'),

    ...timestamps,
  },
  (table) => ({
    fileBusinessForeignKey: foreignKey({
      columns: [table.businessId, table.fileId],
      foreignColumns: [files.businessId, files.id],
      name: 'documents_business_file_fk',
    }),
  }),
);


// ============================================================
// DOCUMENT CHUNKS
// ============================================================

export const documentChunks = pgTable(
  'document_chunks',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    documentId: uuid('document_id')
      .notNull()
      .references(() => documents.id, {
        onDelete: 'cascade',
      }),

    chunkIndex: varchar('chunk_index', {
      length: 20,
    }).notNull(),

    content: text('content'),

    tokenCount: varchar('token_count', {
      length: 30,
    }),

    metadata: text('metadata'),

    ...timestamps,
  },
);


// ============================================================
// KNOWLEDGE ITEMS
// ============================================================

export const knowledgeItems = pgTable(
  'knowledge_items',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    sourceType: varchar('source_type', {
      length: 100,
    }).notNull(),

    sourceId: uuid('source_id'),

    title: varchar('title', {
      length: 300,
    }),

    content: text('content'),

    metadata: text('metadata'),

    ...timestamps,
  },
);


// ============================================================
// EMBEDDINGS
// ============================================================

export const embeddings = pgTable(
  'embeddings',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    businessId: uuid('business_id')
      .notNull()
      .references(() => businesses.id, {
        onDelete: 'cascade',
      }),

    sourceType: varchar('source_type', {
      length: 100,
    }).notNull(),

    sourceId: uuid('source_id'),

    model: varchar('model', {
      length: 200,
    }).notNull(),

    dimensions: varchar('dimensions', {
      length: 20,
    }).notNull(),

    vectorData: text('vector_data').notNull(),

    ...timestamps,
  },
);


// ============================================================
// KNOWLEDGE TYPES
// ============================================================

export type FileRecord =
  typeof files.$inferSelect;

export type NewFileRecord =
  typeof files.$inferInsert;

export type Document =
  typeof documents.$inferSelect;

export type NewDocument =
  typeof documents.$inferInsert;

export type DocumentChunk =
  typeof documentChunks.$inferSelect;

export type NewDocumentChunk =
  typeof documentChunks.$inferInsert;

export type KnowledgeItem =
  typeof knowledgeItems.$inferSelect;

export type NewKnowledgeItem =
  typeof knowledgeItems.$inferInsert;

export type Embedding =
  typeof embeddings.$inferSelect;

export type NewEmbedding =
  typeof embeddings.$inferInsert;
