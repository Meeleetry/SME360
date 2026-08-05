// Prisma database seeder script for local development & production setup
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding SME360 AI Database...');

  // Clean existing
  await prisma.invoiceItem.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.product.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      email: 'admin@sme360.ai',
      password: 'password123', // Hashed in production
      name: 'Alex Rivera',
      companyName: 'Apex Innovations SME',
      role: 'admin',
      currency: 'USD',
    },
  });
  console.log('✅ Admin User created:', admin.email);

  // Seed Customers
  const customer1 = await prisma.customer.create({
    data: {
      name: 'Sarah Jenkins',
      company: 'Apex Digital Solutions',
      email: 'sarah@apexdigital.com',
      phone: '+1 (555) 234-5678',
      status: 'Active',
      totalSpent: 14850,
      lastOrderDate: '2026-08-01',
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: 'Marcus Vance',
      company: 'Vance Capital Ltd',
      email: 'marcus@vancecapital.io',
      phone: '+1 (555) 876-5432',
      status: 'Active',
      totalSpent: 28400,
      lastOrderDate: '2026-08-03',
    },
  });
  console.log('✅ Customers seeded');

  // Seed Products
  await prisma.product.createMany({
    data: [
      {
        sku: 'SME-ERP-01',
        name: 'Smart POS Terminal Suite',
        category: 'Hardware',
        price: 850,
        cost: 480,
        stock: 24,
        reorderPoint: 10,
        unit: 'pcs',
      },
      {
        sku: 'SME-CLD-02',
        name: 'Cloud Backup Gateway v3',
        category: 'Networking',
        price: 320,
        cost: 160,
        stock: 45,
        reorderPoint: 15,
        unit: 'pcs',
      },
    ],
  });
  console.log('✅ Products seeded');

  // Seed Invoices
  await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-001',
      customerId: customer1.id,
      customerName: customer1.name,
      customerEmail: customer1.email,
      issueDate: new Date('2026-07-28'),
      dueDate: new Date('2026-08-12'),
      subtotal: 8500,
      tax: 0,
      total: 8500,
      status: 'paid',
      items: {
        create: [
          {
            description: 'Q3 Enterprise Consulting & System Audit',
            quantity: 1,
            unitPrice: 8500,
            amount: 8500,
          },
        ],
      },
    },
  });
  console.log('✅ Invoices seeded');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
