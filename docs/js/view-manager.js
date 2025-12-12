// ==================== VIEW MANAGER ====================
// Alternate views: conditioning and weekly schedule

// ==================== CONDITIONING VIEW ====================

function showConditioning() {
    userData.currentView = 'conditioning';
    generateTemplateTabs();
    updateWeekDisplay();
    renderConditioning();
}

function renderConditioning() {
    const container = document.getElementById('workoutDays');
    const conditioning = window.workoutTemplates?.[userData.tier]?.[userData.phase]?.['conditioning'];
    
    if (!conditioning) {
        container.innerHTML = `<div class="workout-day"><p>No conditioning plan available for this phase.</p></div>`;
        return;
    }
    
    // Get the current week's conditioning (handle repeat weeks)
    let weekKey = `week${userData.currentWeek}`;
    let weekData = conditioning[weekKey];
    
    // Handle repeat weeks
    if (weekData?.repeatWeek) {
        const repeatKey = `week${weekData.repeatWeek}`;
        weekData = { ...conditioning[repeatKey], note: weekData.note };
    }
    
    let html = '';
    
    // Overview card
    html += renderConditioningOverview(conditioning, weekData);
    
    // Session cards
    ['sessionA', 'sessionB', 'sessionC'].forEach((sessionKey, index) => {
        const session = weekData[sessionKey];
        if (session) {
            html += renderConditioningSession(session, sessionKey, index);
        }
    });
    
    container.innerHTML = html;
}

function renderConditioningOverview(conditioning, weekData) {
    return `
        <div class="workout-day" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));">
            <div class="workout-header">
                <div class="workout-title">🏃 Non-Impact Conditioning Overview</div>
                <div class="workout-badge" style="background: #10b981;">Week ${userData.currentWeek}</div>
            </div>
            <div style="padding: 16px;">
                <p style="margin: 0 0 12px 0; font-size: 1.1rem; font-weight: 500;">${conditioning.overview.goal}</p>
                <div style="margin-bottom: 12px;">
                    <strong>Frequency:</strong> ${conditioning.overview.frequency}
                </div>
                <div style="margin-bottom: 12px;">
                    <strong>Equipment Options:</strong> ${conditioning.overview.equipment.join(', ')}
                </div>
                <div style="background: rgba(16, 185, 129, 0.1); padding: 12px; border-radius: 8px; border-left: 4px solid #10b981;">
                    <strong>Key Rules:</strong>
                    <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                        ${conditioning.overview.keyRules.map(rule => `<li style="margin-bottom: 4px;">${rule}</li>`).join('')}
                    </ul>
                </div>
                ${weekData.note ? `<p style="margin: 12px 0 0 0; font-style: italic; color: var(--text-secondary);">📝 ${weekData.note}</p>` : ''}
            </div>
        </div>
    `;
}

function renderConditioningSession(session, sessionKey, index) {
    const sessionLabels = ['Session A', 'Session B', 'Session C'];
    const dayLabels = ['(Day 2 or Post-Lift)', '(Day 4 or Post-Lift)', '(Day 6 or Post-Lift)'];
    
    // Find Option A and Option B structures
    const optionA = session.structure.find(item => item.type === 'optionA');
    const optionB_warmup = session.structure.find(item => item.type === 'optionB-warmup');
    const optionB_work = session.structure.filter(item => item.type === 'optionB-work' || item.type === 'optionB-work2');
    const optionB_cooldown = session.structure.find(item => item.type === 'optionB-cooldown');
    
    return `
        <div class="workout-day">
            <div class="workout-header">
                <div class="workout-title">${sessionLabels[index]} ${dayLabels[index]}</div>
                <div class="workout-badge" style="background: #10b981;">${session.totalTime}</div>
            </div>
            <div style="padding: 16px;">
                
                <!-- Instruction Header -->
                <div style="background: rgba(59, 130, 246, 0.1); padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
                    <strong style="color: #3b82f6;">✋ Choose ONE conditioning approach:</strong>
                </div>
                
                <!-- OPTION A: Steady State -->
                ${renderOptionA(optionA)}
                
                <!-- OR Divider -->
                <div style="display: flex; align-items: center; margin: 24px 0; gap: 16px;">
                    <div style="flex: 1; height: 1px; background: linear-gradient(to right, transparent, var(--border-color), transparent);"></div>
                    <span style="font-weight: 600; color: var(--text-secondary); font-size: 0.9rem;">OR</span>
                    <div style="flex: 1; height: 1px; background: linear-gradient(to left, transparent, var(--border-color), transparent);"></div>
                </div>
                
                <!-- OPTION B: Intervals -->
                ${renderOptionB(session, optionB_warmup, optionB_work, optionB_cooldown)}
                
                <!-- Coach Note -->
                <div style="background: rgba(245, 158, 11, 0.1); padding: 12px 16px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #f59e0b;">
                    <div style="display: flex; align-items: start; gap: 8px;">
                        <span style="font-size: 1.1rem;">💡</span>
                        <div>
                            <strong style="color: #d97706;">Coach Note:</strong>
                            <span style="margin-left: 4px;">${session.coachNote}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderOptionA(optionA) {
    if (!optionA) return '';
    
    return `
        <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05)); padding: 16px; border-radius: 12px; margin-bottom: 16px; border: 2px solid rgba(59, 130, 246, 0.3);">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <span style="font-size: 1.5rem; margin-right: 8px;">🚴</span>
                <h3 style="margin: 0; color: #2563eb; font-size: 1.2rem;">Option A: Steady State</h3>
            </div>
            <div style="font-size: 1.1rem; font-weight: 500; margin-bottom: 8px; color: var(--text-primary);">
                ${optionA.description}
            </div>
            <div style="font-size: 0.95rem; color: var(--text-secondary);">
                ${optionA.detail}
            </div>
        </div>
    `;
}

function renderOptionB(session, warmup, work, cooldown) {
    return `
        <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05)); padding: 16px; border-radius: 12px; border: 2px solid rgba(245, 158, 11, 0.3);">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <span style="font-size: 1.5rem; margin-right: 8px;">⚡</span>
                <h3 style="margin: 0; color: #d97706; font-size: 1.2rem;">Option B: Intervals (${session.totalTime} total)</h3>
            </div>
            
            <div style="font-weight: 500; margin-bottom: 12px; color: var(--text-primary);">Structure:</div>
            
            ${warmup ? renderIntervalSection('Warmup', warmup.description, '🔥', '#ef4444') : ''}
            
            ${work.map(w => renderIntervalSection('Work', w.description, '💪', '#10b981', w.detail)).join('')}
            
            ${cooldown ? renderIntervalSection('Cooldown', cooldown.description, '🧘', '#8b5cf6') : ''}
        </div>
    `;
}

function renderIntervalSection(title, description, icon, color, detail = '') {
    return `
        <div style="background: rgba(${color === '#ef4444' ? '239, 68, 68' : color === '#10b981' ? '16, 185, 129' : '139, 92, 246'}, 0.1); padding: 12px 16px; border-radius: 8px; margin-bottom: 8px; border-left: 3px solid ${color};">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="font-size: 1.1rem;">${icon}</span>
                <strong style="color: ${color};">${title}</strong>
            </div>
            <div style="margin-left: 28px;">
                <div style="font-size: ${detail ? '1rem' : '0.95rem'}; ${detail ? 'font-weight: 500; margin-bottom: 4px;' : ''}">
                    ${description.replace('Option B: ', '')}
                </div>
                ${detail ? `<div style="font-size: 0.85rem; color: var(--text-secondary);">${detail}</div>` : ''}
            </div>
        </div>
    `;
}

// ==================== WEEKLY SCHEDULE VIEW ====================

function showWeeklySchedule() {
    userData.currentView = 'schedule';
    generateTemplateTabs();
    renderWeeklySchedule();
}

function renderWeeklySchedule() {
    const container = document.getElementById('workoutDays');
    const scheduleData = window.workoutTemplates?.[userData.tier]?.[userData.phase]?.['weeklySchedule'];
    
    if (!scheduleData) {
        container.innerHTML = `<div class="workout-day"><p>No schedule available for this phase.</p></div>`;
        return;
    }
    
    const templateSchedule = scheduleData[userData.currentTemplate];
    if (!templateSchedule) {
        container.innerHTML = `<div class="workout-day"><p>No schedule available for ${userData.currentTemplate} template.</p></div>`;
        return;
    }
    
    let html = `
        <div class="workout-day" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));">
            <div class="workout-header">
                <div class="workout-title">📅 ${templateSchedule.name}</div>
                <div class="workout-badge" style="background: #3b82f6;">Weekly View</div>
            </div>
            <div style="padding: 16px;">
    `;
    
    // If there are options (like for 3-day)
    if (templateSchedule.options) {
        html += `<p style="margin: 0 0 16px 0; font-style: italic; color: var(--text-secondary);">${templateSchedule.note || ''}</p>`;
        
        templateSchedule.options.forEach((option, index) => {
            html += `
                <div style="margin-bottom: 20px; ${index > 0 ? 'border-top: 1px solid var(--border-color); padding-top: 16px;' : ''}">
                    <h4 style="margin: 0 0 12px 0; color: var(--primary-color);">${option.name}</h4>
                    ${renderScheduleTable(option.schedule)}
                </div>
            `;
        });
    } else {
        html += renderScheduleTable(templateSchedule.schedule);
    }
    
    html += `
            </div>
        </div>
    `;
    
    // Add tips card
    html += `
        <div class="workout-day">
            <div class="workout-header">
                <div class="workout-title">💡 Scheduling Tips</div>
            </div>
            <div style="padding: 16px;">
                <ul style="margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 8px;"><strong>Rest days matter</strong> — recovery is when you get stronger</li>
                    <li style="margin-bottom: 8px;"><strong>Don't skip conditioning</strong> — building your aerobic base helps everything else</li>
                    <li style="margin-bottom: 8px;"><strong>Lift before conditioning</strong> if doing same day — strength first, cardio second</li>
                    <li style="margin-bottom: 8px;"><strong>Listen to your body</strong> — if you're exhausted, take an extra rest day</li>
                </ul>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function renderScheduleTable(schedule) {
    const typeColors = {
        lift: { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' },
        conditioning: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' },
        rest: { bg: 'rgba(156, 163, 175, 0.1)', text: '#6b7280' },
        both: { bg: 'rgba(139, 92, 246, 0.1)', text: '#8b5cf6' }
    };
    
    let html = '<div style="display: grid; gap: 8px;">';
    
    schedule.forEach(day => {
        const colors = typeColors[day.type] || typeColors.rest;
        html += `
            <div style="display: flex; align-items: center; background: ${colors.bg}; padding: 10px 14px; border-radius: 8px; border-left: 4px solid ${colors.text};">
                <div style="width: 100px; font-weight: 600;">${day.day}</div>
                <div style="flex: 1;">${day.activity}</div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// ==================== EXPORTS ====================
window.showConditioning = showConditioning;
window.renderConditioning = renderConditioning;
window.showWeeklySchedule = showWeeklySchedule;
window.renderWeeklySchedule = renderWeeklySchedule;
window.renderScheduleTable = renderScheduleTable;

console.log('✅ View Manager loaded');
