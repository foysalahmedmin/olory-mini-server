<!-- 

mysql -h caboose.proxy.rlwy.net -u root -p --port 23650 --protocol=TCP railway

# Sync schema with DB
npx prisma db push

# (If using migrations) baseline the existing DB schema
npx prisma migrate resolve --applied init  # replace init with your migration folder name

# Generate Prisma client
npx prisma generate

# Build & deploy (can be run locally to test)
npm run vercel-build 

# Vercel 
npm i -g vercel
vercel login
vercel
vercel --prod

-->

# olory-mini
