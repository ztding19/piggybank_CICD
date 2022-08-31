string NODE_LABEL = 'ubuntu'
pipeline {
    agent { label "$NODE_LABEL"}
    parameters{
        string( name: "goal", defaultValue: "10000000" )
    }
    environment{
        contract_name = "PiggyBank"
        contract_version = "0.8.16"
    }
    stages{
        stage('checkout'){
            steps{
                script{
                    git url: 'git@gitlab.devsecops.trendmicro.com:ting_ding/piggybank_automation.git', branch: 'dev_auto_deploy'
                    sh "git checkout dev_auto_deploy"
                }
            }
        }
        stage('npm install'){
            steps{
                sh "npm install web3"
                sh "npm install solc@0.8.16"
            }
        }
        stage('slither'){
            steps{
                script{
                    sh(script: "echo 'run slither'")
                    sh(script: "sudo docker run --rm -i -d -v $workspace:/data --name slither trailofbits/eth-security-toolbox")
                    sh(script: "sudo docker exec slither bash -c 'solc-select install 0.8.16'")
                    sh(script: "sudo docker exec slither bash -c 'solc-select use 0.8.16'")
                    sh(script: "sudo docker exec slither bash -c 'slither /data/PiggyBank.sol --json -' > slither_output.json || exit 0")
                    env.slither_output = readFile('slither_output.json').trim()
                }
            }
        }
        stage('mythril'){
            steps{
                script{
                    sh(script: "sudo docker run --rm -i -v $workspace:/data mythril/myth analyze /data/PiggyBank.sol --solv 0.8.16 -o json > mythril_output.json")
                    env.mythril_output = readFile('mythril_output.json').trim()
                }
            }
        }
        stage('echidna npm install'){
            steps{
                dir('TestEchidna'){
                    sh "npm install --global yarn"
                    sh "yarn"
                    sh "yarn add -dev hardhat"
                }
            }
        }
        stage('echidna'){
            steps{
                dir('TestEchidna'){
                    sh "yarn Pig > $workspace/echidna_output.txt"
                }
                script{
                    env.echidna_output = readFile("echidna_output.txt").trim()
                }
            }
        }
        stage('compile'){
            steps{
                sh "node compile.js"
            }
        }
        stage('deploy'){
            steps{
                sh "node deployWeb3.js $goal"
            }
        }
    }
    post{
        always{
            script {
                try {
                    sh "sudo docker stop slither"
                } catch (Exception e){
                    echo "slither doesn't exist"
                }
            }
            script {
                try {
                    sh "sudo docker stop slither"
                } catch (Exception e){
                    echo "slither doesn't exist"
                }
            }
            emailext (
                attachmentsPattern: 'contract_info.json',,
                to: '$DEFAULT_RECIPIENTS', 
                subject: '$DEFAULT_SUBJECT',
                body: '$DEFAULT_CONTENT',
                mimeType: 'text/html'
            );
        }
    }
}