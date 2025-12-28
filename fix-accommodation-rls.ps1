#!/usr/bin/env pwsh
# Script to fix RLS policies for accommodation and lunch bookings

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   FIX ACCOMMODATION & LUNCH RLS POLICIES" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Supabase CLI is installed
Write-Host "Checking Supabase CLI..." -ForegroundColor Blue
$supabaseCLI = Get-Command supabase -ErrorAction SilentlyContinue

if (-not $supabaseCLI) {
    Write-Host "❌ Supabase CLI not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install it using one of these methods:" -ForegroundColor Yellow
    Write-Host "  npm install -g supabase" -ForegroundColor Gray
    Write-Host "  Or download from: https://supabase.com/docs/guides/cli" -ForegroundColor Gray
    Write-Host ""
    Write-Host "After installation, link your project:" -ForegroundColor Yellow
    Write-Host "  supabase link --project-ref <your-project-ref>" -ForegroundColor Gray
    Write-Host ""
    
    Write-Host "For now, please run the SQL manually:" -ForegroundColor Yellow
    Write-Host "1. Open Supabase Dashboard -> SQL Editor" -ForegroundColor White
    Write-Host "2. Copy and paste the SQL from:" -ForegroundColor White
    Write-Host "   database/fix_accommodation_lunch_rls.sql" -ForegroundColor Cyan
    Write-Host "3. Click 'Run' to execute" -ForegroundColor White
    Write-Host ""
    
    pause
    exit 1
}

Write-Host "✅ Supabase CLI found!" -ForegroundColor Green
Write-Host ""

# Run the SQL file
Write-Host "Applying RLS policy fixes..." -ForegroundColor Blue
Write-Host ""

$sqlFile = "database/fix_accommodation_lunch_rls.sql"

if (Test-Path $sqlFile) {
    Write-Host "Running SQL file: $sqlFile" -ForegroundColor Cyan
    
    try {
        supabase db push --file $sqlFile
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "================================================" -ForegroundColor Green
            Write-Host "          ✅ SUCCESS!" -ForegroundColor Green
            Write-Host "================================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "RLS policies have been fixed!" -ForegroundColor Green
            Write-Host ""
            Write-Host "What was fixed:" -ForegroundColor Yellow
            Write-Host "  ✅ Row-Level Security policies updated" -ForegroundColor White
            Write-Host "  ✅ Users can now insert accommodation requests" -ForegroundColor White
            Write-Host "  ✅ Users can now insert lunch bookings" -ForegroundColor White
            Write-Host "  ✅ Proper permissions granted" -ForegroundColor White
            Write-Host ""
            Write-Host "Next steps:" -ForegroundColor Yellow
            Write-Host "  1. Restart your backend server (npm start)" -ForegroundColor White
            Write-Host "  2. Try booking accommodation or lunch again" -ForegroundColor White
            Write-Host "  3. Check for success toast messages!" -ForegroundColor White
            Write-Host ""
        } else {
            throw "Supabase command failed"
        }
    } catch {
        Write-Host ""
        Write-Host "❌ Error running Supabase command" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please run the SQL manually:" -ForegroundColor Yellow
        Write-Host "1. Open Supabase Dashboard -> SQL Editor" -ForegroundColor White
        Write-Host "2. Copy and paste the SQL from:" -ForegroundColor White
        Write-Host "   $sqlFile" -ForegroundColor Cyan
        Write-Host "3. Click 'Run' to execute" -ForegroundColor White
        Write-Host ""
    }
} else {
    Write-Host "❌ SQL file not found: $sqlFile" -ForegroundColor Red
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
