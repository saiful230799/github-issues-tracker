const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

// Dom Ref
const container = document.getElementById("issuesContainer");
const tabs = document.querySelectorAll(".tab-btn");
const searchInput = document.getElementById("searchInput");
const issueCountText = document.getElementById("issueCount");

// All issues
async function loadIssues() {
    setActiveTab("all");
    showLoading();

    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        displayIssues(data.data);
    } catch (err) {
        container.innerHTML = `<p class="col-span-4 text-center text-red-500">Error loading issues!</p>`;
        console.error(err);
    }
}

// card display
function displayIssues(issues) {
    container.innerHTML = "";
    
    // issue count
    if (issueCountText) {
        issueCountText.innerText = `${issues.length} Issues`;
    }

    if (issues.length === 0) {
        container.innerHTML = `<p class="col-span-4 text-center text-gray-500">No issues found.</p>`;
        return;
    }

    issues.forEach(issue => {
        const card = document.createElement("div");
        
        const borderStyle = issue.status === "open" ? "border-t-4 border-t-green-500" : "border-t-4 border-t-purple-500";
        card.className = `bg-white rounded-lg shadow-sm border ${borderStyle} flex flex-col cursor-pointer hover:shadow-md transition overflow-hidden`;

        // priority
        const priorityClass = issue.priority.toLowerCase() === 'high' 
            ? 'bg-red-50 text-red-500' 
            : (issue.priority.toLowerCase() === 'medium' ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-100 text-gray-600');

        card.innerHTML = `
            <div class="p-5 flex-grow">
                <div class="flex justify-between items-start mb-3">
                    <div class="w-6 h-6 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                         <div class="w-2 h-2 rounded-full ${issue.status === 'open' ? 'bg-green-500' : 'bg-purple-500'}"></div>
                    </div>
                    <span class="px-3 py-1 rounded-md text-[10px] font-bold uppercase ${priorityClass}">${issue.priority}</span>
                </div>
                
                <h3 class="font-bold text-gray-800 leading-snug mb-2 line-clamp-2">${issue.title}</h3>
                <p class="text-sm text-gray-500 mb-4 line-clamp-2">${issue.description}</p>
                
                <div class="flex gap-2 mb-2">
                    <span class="px-2 py-1 bg-red-50 text-red-400 text-[10px] rounded border border-red-100 uppercase font-semibold">
                        <i class="fa-solid fa-tag text-[8px]"></i> BUG
                    </span>
                    <span class="px-2 py-1 bg-yellow-50 text-yellow-600 text-[10px] rounded border border-yellow-100 uppercase font-semibold">
                        @ HELP WANTED
                    </span>
                </div>
            </div>
            
            <div class="p-4 border-t bg-gray-50 mt-auto">
                <p class="text-xs text-gray-600 font-medium">#${issue.id.toString().slice(-4)} by ${issue.author}</p>
                <p class="text-[10px] text-gray-400 mt-1">${issue.createdAt}</p>
            </div>
        `;

        card.addEventListener("click", () => openModal(issue.id));
        container.appendChild(card);
    });
}

// status filter
async function filterStatus(status) {
    setActiveTab(status);
    showLoading();

    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const filtered = data.data.filter(issue => issue.status === status);
        displayIssues(filtered);
    } catch (err) {
        console.error("Filter error:", err);
    }
}

// search functionally
async function searchIssue() {
    const text = searchInput.value.trim();
    if (!text) return loadIssues();

    showLoading("Searching...");
    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
        const data = await res.json();
        displayIssues(data.data);
    } catch (err) {
        console.error("Search error:", err);
    }
}

// Modal for Single Issue
async function openModal(id) {
    const modal = document.getElementById("issueModal");
    const modalContent = document.getElementById("modalContent");

    // Loading state inside modal
    modalContent.innerHTML = `<div class="p-10 text-center"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-600 mx-auto"></div></div>`;
    modal.classList.remove("hidden");

    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
        const data = await res.json();
        const issue = data.data;

        // Priority Color logic
        const priorityColor = issue.priority.toLowerCase() === 'high' ? 'bg-red-500' : 'bg-yellow-500';

        modalContent.innerHTML = `
            <h2 class="text-2xl font-bold text-gray-800 mb-4">${issue.title}</h2>
            
            <div class="flex items-center gap-2 mb-6 text-gray-500 text-sm">
                <span class="bg-green-600 text-white px-3 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                   <div class="w-1.5 h-1.5 bg-white rounded-full"></div> Opened
                </span>
                <span>• Opened by <span class="font-semibold text-gray-700">${issue.author}</span> • ${issue.createdAt}</span>
            </div>

            <div class="flex gap-2 mb-8">
                <span class="px-2 py-0.5 bg-red-50 text-red-400 text-[11px] rounded border border-red-100 font-bold">🏷️ BUG</span>
                <span class="px-2 py-0.5 bg-yellow-50 text-yellow-600 text-[11px] rounded border border-yellow-100 font-bold">@ HELP WANTED</span>
            </div>

            <div class="mb-10">
                <p class="text-gray-600 leading-relaxed text-base">
                    ${issue.description}
                </p>
            </div>

            <div class="bg-gray-50 p-6 rounded-xl flex justify-between items-center">
                <div>
                    <p class="text-gray-400 text-sm mb-1">Assignee:</p>
                    <p class="font-bold text-gray-800 text-lg">${issue.author}</p>
                </div>
                <div class="text-right">
                    <p class="text-gray-400 text-sm mb-1">Priority:</p>
                    <span class="${priorityColor} text-white px-4 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                        ${issue.priority}
                    </span>
                </div>
            </div>

            <div class="flex justify-end mt-6">
                <button onclick="closeModal()" class="bg-purple-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-purple-700 transition shadow-md">
                    Close
                </button>
            </div>
        `;
    } catch (err) {
        modalContent.innerHTML = "<p class='text-center text-red-500 p-5'>Error loading issue details.</p>";
        console.error(err);
    }
}

// Modal Close
function closeModal() {
    document.getElementById("issueModal").classList.add("hidden");
}

// Active tab highlight
function setActiveTab(status) {
    tabs.forEach(btn => {
        btn.classList.remove("bg-purple-600", "text-white");
        btn.classList.add("bg-white", "text-gray-600");
    });
    const activeBtn = document.querySelector(`.tab-btn[data-status="${status}"]`);
    if (activeBtn) {
        activeBtn.classList.remove("bg-white", "text-gray-600");
        activeBtn.classList.add("bg-purple-600", "text-white");
    }
}

// loading spinner
function showLoading(text = "Loading...") {
    container.innerHTML = `
        <div class="col-span-4 flex justify-center items-center flex-col py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600 mb-4"></div>
            <p class="text-gray-500 font-medium">${text}</p>
        </div>
    `;
}

loadIssues();