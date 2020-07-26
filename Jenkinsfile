pipeline {
    /* insert Declarative Pipeline here */

agent any

stages {
        stage('Deploay/ Build App') {
            steps {
                sh 'pwd'
                sh 'ls -lart'
            }
        }
        
        stage('Frontend tests') {
            steps {
               sh '''
                    cd frontend-project/
                    npm install && npm run test:report:regression                   
                ''' 
                archiveArtifacts allowEmptyArchive: true, artifacts: 'frontend-project/cypress/videos/**'
                publishHTML([
                    allowMissing: false, 
                    alwaysLinkToLastBuild: false, 
                    keepAll: false, 
                    reportDir: 'frontend-project/mochawesome-report', 
                    reportFiles: 'mochawesome.html', 
                    reportName: 'Frontend report', 
                    reportTitles: ''
                ])
            }
        }
        stage('Backend tests') {
            steps {
                  sh '''
                   cd  backend-project/
                 npm install &&  npm run test:report
                
                ''' 

                    publishHTML([
                    allowMissing: false, 
                    alwaysLinkToLastBuild: false, 
                    keepAll: false, 
                    reportDir: 'backend-project/mochawesome-report', 
                    reportFiles: 'mochawesome.html', 
                    reportName: 'Backend report', 
                    reportTitles: ''
                ])


            }
        }
        
        stage('Performace tests') {
           stage('Performance tests') {
            steps {
                sh '''
                    cd performance-tests/
                    rm test1.csv -Rf && rm html-reports/ -Rf
                    jmeter -n -t login-logout.jmx -l test1.csv -e -o html-reports/
                '''
                publishHTML([
                    allowMissing: false, 
                    alwaysLinkToLastBuild: false, 
                    keepAll: false, 
                    reportDir: 'performance-tests/html-reports', 
                    reportFiles: 'index.html', 
                    reportName: 'JMeter dashboard report', 
                    reportTitles: ''
                ])
            }
        }
        }
        
        
    }
}