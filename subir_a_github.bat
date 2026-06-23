cho off
echo.
echo ========================================
echo   Academia IA Generaciones
echo   Sincronizando con GitHub...
echo ========================================
echo.
 
D:
cd "D:\Documentos\Claude\Academia AI"
 
echo [1/3] Agregando cambios...
git add .
 
echo [2/3] Guardando cambios...
set /p mensaje="Describe el cambio (o presiona Enter para omitir): "
if "%mensaje%"=="" set mensaje=Actualizacion automatica
 
git commit -m "%mensaje%"
 
echo [3/3] Subiendo a GitHub...
git push
 
echo.
echo ========================================
echo   Listo! Cambios subidos a GitHub.
echo   github.com/srgabarca-del/academia-ia-generaciones
echo ========================================
echo.
pause
 