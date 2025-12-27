import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Filter, 
  Search,
  ChevronRight,
  Star
} from 'lucide-react';

const EventSchedule = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [filter, setFilter] = useState('My Events'); // 'My Events' or 'All Events'

  const schedule = {
    1: [
      { time: '09:00 AM', name: 'Workshops (5 parallel)', venue: 'Various Labs', category: 'Workshop', coordinator: 'Workshop Team', phone: '+91 98765 43210', isMyEvent: true },
      { time: '09:00 AM', name: 'Technical Events – Round 1', venue: 'Seminar Halls', category: 'Technical', coordinator: 'Tech Team', phone: '+91 98765 43211', isMyEvent: true },
      { time: '09:00 AM', name: 'Registration & QR Attendance', venue: 'Help Desk', category: 'General', coordinator: 'Admin Team', phone: '+91 98765 43212', isMyEvent: false },
      { time: '01:30 PM', name: 'Workshops (4 parallel)', venue: 'Various Labs', category: 'Workshop', coordinator: 'Workshop Team', phone: '+91 98765 43210', isMyEvent: true },
      { time: '01:30 PM', name: 'Non-Technical Events (FREE)', venue: 'Open Grounds', category: 'Non-Technical', coordinator: 'Non-Tech Team', phone: '+91 98765 43213', isMyEvent: true },
      { time: '04:30 PM', name: 'Hackathon Inauguration', venue: 'Main Auditorium', category: 'Hackathon', coordinator: 'Hackathon Team', phone: '+91 98765 43214', isMyEvent: true },
    ],
    2: [
      { time: '09:00 AM', name: 'Workshops (5 parallel)', venue: 'Various Labs', category: 'Workshop', coordinator: 'Workshop Team', phone: '+91 98765 43210', isMyEvent: true },
      { time: '09:00 AM', name: 'Technical Events – Finals', venue: 'Seminar Halls', category: 'Technical', coordinator: 'Tech Team', phone: '+91 98765 43211', isMyEvent: true },
      { time: '09:00 AM', name: 'Non-Technical Events (FREE)', venue: 'Open Grounds', category: 'Non-Technical', coordinator: 'Non-Tech Team', phone: '+91 98765 43213', isMyEvent: false },
      { time: '01:30 PM', name: 'Codeathon & Designathon', venue: 'IT Labs', category: 'Technical', coordinator: 'Coding Team', phone: '+91 98765 43215', isMyEvent: true },
      { time: '01:30 PM', name: 'Startup TN Idea Pitch', venue: 'Conference Hall', category: 'Startup', coordinator: 'Startup Team', phone: '+91 98765 43216', isMyEvent: true },
      { time: '05:30 PM', name: 'Grand Cultural Night', venue: 'Main Stage', category: 'Cultural', coordinator: 'Cultural Team', phone: '+91 98765 43217', isMyEvent: true },
    ],
    3: [
      { time: '09:00 AM', name: 'Workshops (Remaining 4)', venue: 'Various Labs', category: 'Workshop', coordinator: 'Workshop Team', phone: '+91 98765 43210', isMyEvent: true },
      { time: '09:00 AM', name: 'Non-Technical Events (FREE)', venue: 'Open Grounds', category: 'Non-Technical', coordinator: 'Non-Tech Team', phone: '+91 98765 43213', isMyEvent: true },
      { time: '01:00 PM', name: 'Hackathon Final Demo', venue: 'Main Auditorium', category: 'Hackathon', coordinator: 'Hackathon Team', phone: '+91 98765 43214', isMyEvent: true },
      { time: '01:00 PM', name: 'Tech Event Grand Finals', venue: 'Seminar Halls', category: 'Technical', coordinator: 'Tech Team', phone: '+91 98765 43211', isMyEvent: true },
      { time: '04:30 PM', name: 'Valedictory & Prize Distribution', venue: 'Main Auditorium', category: 'General', coordinator: 'Admin Team', phone: '+91 98765 43212', isMyEvent: true },
    ]
  };

  const filteredSchedule = schedule[activeDay].filter(event => 
    filter === 'All Events' || (filter === 'My Events' && event.isMyEvent)
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold">Event Schedule</h2>
          <p className="text-gray-400 text-sm">Plan your journey through DaKshaa 2026</p>
        </div>

        <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl">
          {['My Events', 'All Events'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                filter === f ? 'bg-secondary text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Day Tabs */}
      <div className="flex gap-4 border-b border-white/10">
        {[1, 2, 3].map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`pb-4 px-2 text-lg font-bold transition-all relative ${
              activeDay === day ? 'text-secondary' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Day {day}
            {activeDay === day && (
              <motion.div 
                layoutId="activeDay"
                className="absolute bottom-0 left-0 right-0 h-1 bg-secondary rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Schedule List */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeDay}-${filter}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {filteredSchedule.length > 0 ? (
              filteredSchedule.map((event, idx) => (
                <div 
                  key={idx}
                  className={`group relative bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row md:items-center gap-6 hover:bg-white/[0.08] transition-all duration-300 ${
                    event.isMyEvent ? 'border-l-4 border-l-secondary' : ''
                  }`}
                >
                  {/* Time Column */}
                  <div className="md:w-32 shrink-0">
                    <div className="flex items-center gap-2 text-secondary font-bold">
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Session Start</p>
                  </div>

                  {/* Event Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold group-hover:text-secondary transition-colors">{event.name}</h3>
                      {event.isMyEvent && (
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-secondary" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        <span>{event.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Coordinator Info */}
                  <div className="md:w-48 shrink-0 flex flex-col gap-2">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                        <Phone size={14} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">Coordinator</p>
                        <p className="text-xs font-bold truncate">{event.coordinator}</p>
                      </div>
                    </div>
                  </div>

                  <button className="p-3 bg-white/5 hover:bg-secondary hover:text-white rounded-2xl transition-all">
                    <ChevronRight size={20} />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                  <Calendar size={32} className="text-gray-600" />
                </div>
                <p className="text-gray-500 font-medium">No events found for this day.</p>
                {filter === 'My Events' && (
                  <button 
                    onClick={() => setFilter('All Events')}
                    className="text-secondary font-bold hover:underline"
                  >
                    Browse All Events
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventSchedule;

