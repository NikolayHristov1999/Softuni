class Company {
    constructor() {
        this.departments = {};
    }


    addEmployee(name, salary, position, department) {
        if (!name || !salary || !position || !department || salary < 0) {
            throw new Error("Invalid input!");
        }
        const employee = {
            name,
            salary,
            position,
        }
        if (!this.departments[department]) {
            this.departments[department] = [];
        }
        this.departments[department].push(employee);
        return `New employee is hired. Name: ${name}. Position: ${position}`
    }

    bestDepartment() {
        const keys = Object.keys(this.departments);
        let bestSalary = 0;
        let name = "";
        for (let key of keys) {
            const deparment = this.departments[key];
            let sum = 0;
            for (const el of deparment) {
                sum += el.salary;
            }
            const avg = sum / deparment.length;
            if (bestSalary < avg) {
                name = key;
                bestSalary = avg;
            }
        }
        let str = `Best Department is: ${name}\nAverage salary: ${bestSalary.toFixed(2)}\n`;
        this.departments[name].sort((a, b) => {
            if (b.salary != a.salary) {
                return b.salary - a.salary;
            } else {
                return a.name.localeCompare(b.name);
            }
        });
        for (let employee of this.departments[name]) {
            str += `${employee.name} ${employee.salary} ${employee.position}\n`;
        }
        return str.trim();

    }
}


let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");

let act = c.bestDepartment();
let exp = "Best Department is: Human resources\nAverage salary: 1675.00\nStanimir 2000 engineer\nGosho 1350 HR";
console.log(act)
console.log(exp);