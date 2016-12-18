1. Jenkins URL and username and password.
	* http://82.221.49.176:8080/ 
	* username: kollagunn
	* password: Hamar117


2. Game URL (AWS)
	http://35.164.247.194/   ... einhverra hluta vegna hef ég ekki náð að skoða leikinn þar, bara locally með docker-compose :( 


## Scripts

Outline what script files you created and the purpose of each file. Each file should be commented. This could be

- Docker-run.sh

- Docker-compose.yaml

- deployScript.sh

- runserver.sh

- bashScripta.sh


## Testing & logic

Outline what tests you created.

- UnitTests, server logic TDD (Git commit log)
'should emit game created event'
'join game command'
'should emit game joined event'
'place a move command'
'should mark grid[0,0] with X, MovePlaced'
'should mark grid[1,1] with X, MovePlaced'

- Is the game playable?
	Nei ég held ekki, náði ekki að skoða það því ég komst ekki inná vélina í vafra.


## Data migration

Did you create a data migration.

- Migration up and down
* Er ekki viss


## Jenkins

Do you have the following Jobs and what happens in each Job:

- Commit Stage
* Já 

- Acceptance Stage
* Nei

- Capacity Stage
* Nei

- Other
* Nei


Did you use any of the following features in Jenkins?

- Schedule or commit hooks, nei

- Pipeline, nei

- Jenkins file, nei

- Test reports, nei

- Other, nei


## Monitoring

Did you do any monitoring?

- URL to monitoring tool. Must be open or include username and pass, nei

## Other

Anything else you did to improve you deployment pipeline of the project itself? nei 