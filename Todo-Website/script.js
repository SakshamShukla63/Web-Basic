const taskInput = document.getElementById('taskInput');
        const addBtn = document.getElementById('addBtn');
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        const taskCounter = document.getElementById('taskCounter');
        const progressFill = document.getElementById('progressFill');
        const greetingBadge = document.getElementById('greetingBadge');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const priorityDots = document.querySelectorAll('.priority-dot');

        let tasks = JSON.parse(localStorage.getItem('aura_tasks')) || [];
        let currentPriority = 'medium';
        let currentFilter = 'all';

        // Set dynamic intelligent greeting based on system clock
        function updateGreeting() {
            const hour = new Date().getHours();
            let greeting = "✨ Focus Time";
            if (hour < 12) greeting = "🌅 Morning Momentum";
            else if (hour < 18) greeting = "☀️ Afternoon Flow";
            else greeting = "🌙 Evening Reflection";
            greetingBadge.textContent = greeting;
        }
        updateGreeting();

        // Priority Selection Logic
        priorityDots.forEach(dot => {
            dot.addEventListener('click', () => {
                priorityDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                currentPriority = dot.dataset.priority;
            });
        });

        // Filters Handling
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderTasks();
            });
        });

        function saveAndRender() {
            localStorage.setItem('aura_tasks', JSON.stringify(tasks));
            renderTasks();
        }

        function renderTasks() {
            taskList.innerHTML = '';

            const filteredTasks = tasks.filter(task => {
                if (currentFilter === 'active') return !task.completed;
                if (currentFilter === 'completed') return task.completed;
                return true;
            });

            // Update Counters & Progress Bar
            const totalTasks = tasks.length;
            const completedCount = tasks.filter(t => t.completed).length;
            taskCounter.textContent = `${completedCount}/${totalTasks} done`;
            
            const progressPercent = totalTasks === 0 ? 0 : (completedCount / totalTasks) * 100;
            progressFill.style.width = `${progressPercent}%`;

            if (filteredTasks.length === 0) {
                emptyState.style.display = 'block';
                return;
            } else {
                emptyState.style.display = 'none';
            }

            filteredTasks.forEach((task) => {
                // Find true index in original array
                const actualIndex = tasks.indexOf(task);

                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;

                let priorityColor = '#f59e0b';
                if (task.priority === 'low') priorityColor = '#3b82f6';
                if (task.priority === 'high') priorityColor = '#f43f5e';

                li.innerHTML = `
                    <div class="task-left">
                        <label class="checkbox-container">
                            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${actualIndex})">
                            <span class="checkmark"></span>
                        </label>
                        <span class="task-text">${escapeHtml(task.text)}</span>
                    </div>
                    <div class="task-meta">
                        <span class="task-tag" style="background: ${priorityColor}" title="${task.priority} priority"></span>
                        <button class="delete-btn" onclick="deleteTask(${actualIndex})" title="Remove task">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }

        function addTask() {
            const text = taskInput.value.trim();
            if (!text) return;

            tasks.unshift({
                text: text,
                completed: false,
                priority: currentPriority,
                createdAt: Date.now()
            });

            taskInput.value = '';
            saveAndRender();
        }

        function toggleTask(index) {
            tasks[index].completed = !tasks[index].completed;
            saveAndRender();
        }

        function deleteTask(index) {
            tasks.splice(index, 1);
            saveAndRender();
        }

        function escapeHtml(str) {
            return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        }

        addBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });

        // Initial launch render
        renderTasks();