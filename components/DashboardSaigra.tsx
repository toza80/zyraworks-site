"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign,
  Users,
  Filter,
  TrendingUp,
  Target,
  Zap,
  Award,
} from "lucide-react";

type Status = "completed" | "pending";
type Priority = "high" | "medium" | "low";
type Category = "Eficiencia" | "Calidad" | "Disponibilidad";

type Task = {
  id: number;
  title: string;
  status: Status;
  impact: string;
  responsible: string;
  duration: string;
  cost: string;
  progress: number; // 0–100
  category: Category;
  priority: Priority;
  stage?: 2; // solo la 2da etapa la marcamos
};

const DashboardSaigra: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | Status>("all");
  const [filterStage, setFilterStage] = useState<"all" | "1" | "2">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const tasks: Task[] = [
    {
      id: 1,
      title: "Estandarización de procesos de impresión y capacitación técnica",
      status: "completed",
      impact: "Disponibilidad + Eficiencia",
      responsible: "D. Bruno + Gamut + Offset",
      duration: "6 semanas",
      cost: "Abono Gamut",
      progress: 100,
      category: "Eficiencia",
      priority: "high",
    },
    {
      id: 2,
      title: "Implementación de línea de tintas CMYK",
      status: "completed",
      impact: "Eficiencia - Reducción tiempos Setup",
      responsible: "D. Bruno + Compras + Offset",
      duration: "4 semanas",
      cost: "Medio / A definir",
      progress: 100,
      category: "Eficiencia",
      priority: "high",
    },
    {
      id: 3,
      title: "Medición colorimétrica de impresión",
      status: "completed",
      impact: "Eficiencia + Calidad",
      responsible: "Offset + Calidad + Gamut",
      duration: "3 semanas",
      cost: "USD 2.000-4.000",
      progress: 100,
      category: "Calidad",
      priority: "high",
    },
    {
      id: 4,
      title: "Capacitación en uso de PCC (Komori)",
      status: "pending",
      impact: "Disponibilidad + Eficiencia",
      responsible: "Komori",
      duration: "2 semanas",
      cost: "A definir con Komori",
      progress: 0,
      category: "Disponibilidad",
      priority: "high",
    },
    {
      id: 5,
      title: "Generación de curvas SCTV para colores especiales",
      status: "pending",
      impact: "Eficiencia - Reducción Setup",
      responsible: "Gamut + Preprensa",
      duration: "3 semanas",
      cost: "Abono Gamut",
      progress: 0,
      category: "Eficiencia",
      priority: "medium",
    },
    {
      id: 6,
      title: "Automatización del control con Print Standardizer",
      status: "pending",
      impact: "Eficiencia - Consistencia color",
      responsible: "D. Bruno + Gamut + IT + Offset",
      duration: "4 semanas",
      cost: "Licencia USD 6.000+",
      progress: 0,
      category: "Eficiencia",
      priority: "high",
    },
    {
      id: 7,
      title: "Implementación de GCR (optimización del negro)",
      status: "pending",
      impact: "Eficiencia - Reducción consumo tinta",
      responsible: "Preprensa + Gamut",
      duration: "2 semanas",
      cost: "Abono Gamut",
      progress: 0,
      category: "Eficiencia",
      priority: "medium",
    },
    {
      id: 8,
      title: "Capacitación en ArtPro",
      status: "pending",
      impact: "Disponibilidad - Reducción errores",
      responsible: "Preprensa + Gamut",
      duration: "2 semanas",
      cost: "Abono Gamut",
      progress: 0,
      category: "Disponibilidad",
      priority: "medium",
    },
    {
      id: 9,
      title: "[2° etapa] Gama expandida (ECG)",
      status: "pending",
      impact: "Eficiencia + Calidad",
      responsible: "Preprensa + Gamut + Offset",
      duration: "6 semanas",
      cost: "A definir",
      progress: 0,
      stage: 2,
      category: "Calidad",
      priority: "low",
    },
    {
      id: 10,
      title: "[2° etapa] Prueba color por monitor calibrado",
      status: "pending",
      impact: "Disponibilidad",
      responsible: "Preprensa + IT + Gamut",
      duration: "3 semanas",
      cost: "A definir",
      progress: 0,
      stage: 2,
      category: "Disponibilidad",
      priority: "low",
    },
    {
      id: 11,
      title: "[2° etapa] Integración sistema INSITE",
      status: "pending",
      impact: "Disponibilidad",
      responsible: "IT + Preprensa + Gamut + Comercial",
      duration: "4 semanas",
      cost: "A definir",
      progress: 0,
      stage: 2,
      category: "Disponibilidad",
      priority: "low",
    },
  ];

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filterStatus === "all" || task.status === filterStatus;
    const stageMatch =
      filterStage === "all" ||
      (filterStage === "1" && !task.stage) ||
      (filterStage === "2" && task.stage === 2);
    return statusMatch && stageMatch;
  });

  const stats = {
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
    total: tasks.length,
    completionRate: Math.round(
      (tasks.filter((t) => t.status === "completed").length / tasks.length) * 100
    ),
  };

  const categoryStats = {
    eficiencia: tasks.filter((t) => t.category === "Eficiencia").length,
    calidad: tasks.filter((t) => t.category === "Calidad").length,
    disponibilidad: tasks.filter((t) => t.category === "Disponibilidad").length,
  };

  const getStatusIcon = (status: Status) =>
    status === "completed" ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <Clock className="w-5 h-5 text-amber-500" />
    );

  const getPriorityColor = (priority: Priority) => {
    if (priority === "high") return "bg-red-100 text-red-700 border-red-300";
    if (priority === "medium") return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-blue-100 text-blue-700 border-blue-300";
  };

  const getCategoryIcon = (category: Category) => {
    if (category === "Eficiencia") return <Zap className="w-4 h-4" />;
    if (category === "Calidad") return <Award className="w-4 h-4" />;
    return <Target className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 animate-pulse">
            Plan Maestro Saigra
          </h1>
          <p className="text-slate-600 text-lg">Dashboard Interactivo de Control y Seguimiento</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-green-500 transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1 font-semibold">Completadas</p>
                <p className="text-4xl font-bold text-green-600">{stats.completed}</p>
                <p className="text-xs text-slate-500 mt-1">de {stats.total} tareas</p>
              </div>
              <div className="relative">
                <CheckCircle className="w-14 h-14 text-green-500 opacity-20" />
                <CheckCircle className="w-14 h-14 text-green-500 absolute top-0 left-0 animate-ping opacity-75" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-amber-500 transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1 font-semibold">Pendientes</p>
                <p className="text-4xl font-bold text-amber-600">{stats.pending}</p>
                <p className="text-xs text-slate-500 mt-1">en progreso</p>
              </div>
              <Clock
                className="w-14 h-14 text-amber-500 opacity-20 animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-purple-500 transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1 font-semibold">Progreso</p>
                <p className="text-4xl font-bold text-purple-600">{stats.completionRate}%</p>
                <p className="text-xs text-slate-500 mt-1">completado</p>
              </div>
              <div className="relative w-14 h-14">
                <svg className="transform -rotate-90 w-14 h-14">
                  <circle cx="28" cy="28" r="24" stroke="#e5e7eb" strokeWidth="4" fill="transparent" />
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    stroke="#a855f7"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 24}`}
                    strokeDashoffset={`${2 * Math.PI * 24 * (1 - stats.completionRate / 100)}`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-purple-600">
                  {stats.completionRate}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-500 transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1 font-semibold">Por Categoría</p>
                <div className="space-y-1 mt-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-slate-600">{categoryStats.eficiencia} Eficiencia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-slate-600">{categoryStats.calidad} Calidad</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-slate-600">{categoryStats.disponibilidad} Disponibilidad</span>
                  </div>
                </div>
              </div>
              <TrendingUp className="w-14 h-14 text-blue-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-slate-800">Progreso del Plan</h3>
            <span className="text-2xl font-bold text-purple-600">{stats.completionRate}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-8 overflow-hidden relative">
            <div
              className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 h-full flex items-center justify-center text-white text-sm font-bold transition-all duration-1000 relative overflow-hidden"
              style={{ width: `${stats.completionRate}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
              <span className="relative z-10">
                {stats.completed} de {stats.total} tareas
              </span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-slate-600" />
            <h3 className="text-lg font-semibold text-slate-800">Filtros</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  filterStatus === "all"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilterStatus("completed")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  filterStatus === "completed"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Completadas
              </button>
              <button
                onClick={() => setFilterStatus("pending")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  filterStatus === "pending"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Pendientes
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilterStage("all")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  filterStage === "all"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Todas las Etapas
              </button>
              <button
                onClick={() => setFilterStage("1")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  filterStage === "1"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                1ra Etapa
              </button>
              <button
                onClick={() => setFilterStage("2")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  filterStage === "2"
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg transform scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                2da Etapa
              </button>
            </div>

            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  viewMode === "grid" ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Vista Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  viewMode === "list" ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Vista Lista
              </button>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <span>Tareas Filtradas</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              {filteredTasks.length}
            </span>
          </h3>

          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`border-2 rounded-xl p-5 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl ${
                  task.status === "completed"
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300"
                    : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300"
                } ${selectedTask?.id === task.id ? "ring-4 ring-purple-500 scale-105" : ""}`}
                onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <span className="text-lg font-bold text-slate-700">#{task.id}</span>
                  </div>
                  <div className="flex gap-2">
                    {task.stage === 2 && (
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                        2da Etapa
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(task.priority)}`}>
                      {task.priority === "high" ? "🔥 Alta" : task.priority === "medium" ? "⚡ Media" : "📌 Baja"}
                    </span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-slate-800 mb-3">{task.title}</h4>

                <div className="flex items-center gap-2 mb-3">
                  {getCategoryIcon(task.category)}
                  <span className="text-sm font-semibold text-slate-600">{task.category}</span>
                </div>

                {selectedTask?.id === task.id && (
                  <div className="mt-4 space-y-3 border-t-2 border-slate-200 pt-4 animate-fadeIn">
                    <div className="bg-white bg-opacity-50 rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2 text-sm text-slate-700">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-bold">Impacto:</span>
                          <p className="text-slate-600">{task.impact}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-slate-700">
                        <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-bold">Responsable:</span>
                          <p className="text-slate-600">{task.responsible}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="font-bold">Duración:</span>
                        <span className="text-slate-600">{task.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <DollarSign className="w-4 h-4 flex-shrink-0" />
                        <span className="font-bold">Costo:</span>
                        <span className="text-slate-600">{task.cost}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                    <span>Progreso</span>
                    <span className="font-bold">{task.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        task.status === "completed"
                          ? "bg-gradient-to-r from-green-400 to-emerald-500"
                          : "bg-gradient-to-r from-amber-400 to-orange-500"
                      }`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">Dashboard actualizado en tiempo real</p>
          <p className="text-slate-400 text-xs mt-1">Haz clic en cualquier tarea para ver más detalles</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSaigra;
