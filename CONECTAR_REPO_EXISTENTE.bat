@echo off
chcp 65001 > nul
color 0A
cls

echo ========================================================
echo      CONECTAR AO GITHUB (FORCAR USUARIO BERLIMOBRAS)
echo ========================================================
echo.
echo Identifiquei que seu computador estava tentando usar a conta
echo "KarenBrasil" (antiga), por isso dava erro de permissao.
echo.
echo Agora forcei o uso da conta "berlimobras".
echo.
echo Vai pedir sua senha/token ou abrir a janela de login correta.
echo.

set REPO_URL=https://berlimobras@github.com/berlimobras/engenhariapro-hub.git


if "%REPO_URL%"=="" goto erro

echo.
echo Configurando conexao com: %REPO_URL%
echo.

:: Remove origin anterior se existir
git remote remove origin 2>nul

:: Adiciona novo remote
git remote add origin %REPO_URL%

echo Enviando atualizacoes para o GitHub...
echo (Isso vai forcar a atualizacao do site com as melhorias do seu PC)
echo.

git push -u origin main --force

echo.
if %errorlevel% neq 0 (
    color 0C
    echo [ERRO] Nao consegui enviar.
    echo.
    echo Possiveis causas:
    echo 1. A URL esta incorreta?
    echo 2. O repositorio eh privado? (Se for, uma janela de login deve abrir)
    echo 3. Voce tem permissao de escrita?
    echo.
) else (
    color 0A
    echo [SUCESSO] Conectado e atualizado!
    echo.
    echo O Lovable deve identificar as mudancas agora.
)

pause
goto fim

:erro
color 0C
echo Voce nao colou nenhuma URL. Tente novamente.
pause

:fim
