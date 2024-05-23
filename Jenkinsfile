pipeline {
    agent { label 'production-agent' }

    stages {
        stage('system-update') {
            steps {
                echo "updating system"
                sh 'apt update'
            }
        }
        stage('restart-docker') {
            steps {
                echo "restarting docker"
                sh 'systemctl restart docker'
            }
        }
        stage('remove-stack') {
            steps {
                echo "removing old rafiq-stack"
                sh 'docker stack rm rafiq-stack'
            }
        }
        stage('build') {
            steps {
                echo "building code"
                sh 'docker-compose -f production.yml up --build -d'
            }
        }
        stage('deploy') {
            steps {
                echo "deploying code"
                sh 'docker stack deploy -c production.yml rafiq-stack'
            }
        }
    }
    post {
        success{
            slackSend channel: 'alert-manager', color: 'good', message: "BUILD SUCCESSFULL!!!\nBUILD='${env.JOB_NAME}'\nbranch='${env.BRANCH_NAME}'\ntarget-branch='${env.CHANGE_TARGET}'\nbuild-number='#${env.BUILD_NUMBER}'\nbuild-id='#${env.BUILD_ID}\ntimestamp='${env.TAG_TIMESTAMP}'\nbuild-url='${env.BUILD_URL}'\ntime='${currentBuild.startTimeInMillis}ms'\nduration-for-build='${currentBuild.duration}ms'", teamDomain: 'rafiq', tokenCredentialId: 'slack-channel'
        }
        failure{
            slackSend channel: 'alert-manager', color: 'danger', message: "BUILD FAILED WARNING!!!\nBUILD='${env.JOB_NAME}'\nbranch='${env.BRANCH_NAME}'\ntarget-branch='${env.CHANGE_TARGET}'\nbuild-number='#${env.BUILD_NUMBER}'\nbuild-id='#${env.BUILD_ID}\ntimestamp='${env.TAG_TIMESTAMP}'\nbuild-url='${env.BUILD_URL}'\ntime='${currentBuild.startTimeInMillis}'\nduration-for-build='${currentBuild.duration}ms'", teamDomain: 'rafiq', tokenCredentialId: 'slack-channel'
        }
    }
}
